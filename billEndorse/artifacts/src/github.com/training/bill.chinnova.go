package main

import (
    "fmt"
	"github.com/hyperledger/fabric/common/flogging"
    "github.com/hyperledger/fabric/core/chaincode/shim"
    pb "github.com/hyperledger/fabric/protos/peer"
    "encoding/json"
	"time"
)

//var chaincodeLogger = shim.NewLogger("ChainnovaChaincode")
var chaincodeLogger = flogging.MustGetLogger("ChainnovaChaincode")

const (
	BillInfo_State_NewPublish = "NewPublish"
	BillInfo_State_EndrWaitSign = "EndrWaitSign"
	BillInfo_State_EndrSigned = "EndrSigned"
	BillInfo_State_EndrReject = "EndrReject"
)
const Bill_Prefix = "Bill_"

const IndexName = "holderName~billNo"

type Bill struct {
	BillInfoID string `json:BillInfoID`
	BillInfoAmt string `json:BillInfoAmt`
	BillInfoType string `json:BillInfoType`
	BillInfoIsseDate string `json:BillInfoIsseDate`
	BillInfoDueDate string `json:BillInfoDueDate`
	DrwrCmID string `json:DrwrCmID`
	DrwrAcct string `json:DrwrAcct`
	AccptrCmID string `json:AccptrCmID`
	AccptrAcct string `json:AccptrAcct`
	PyeeCmID string `json:PyeeCmID`
	PyeeAcct string `json:PyeeAcct`
	Hodr_CmId string `json:Hodr_CmId`
	Hodr_Acct string `json:Hodr_Acct`
	WaitEndorser_CmId string `json:WaitEndoser_CmId`
	WaitEndorser_Acct string `json:WaitEndoser_Acct`
	State string `json:State`
	History []HistoryItem `json:History`
}

type HistoryItem struct {
	TxId  string `json:"txId"`
	Bill Bill `json:"bill"`
}

type chaincodeRet struct {
    Code int // 0 success otherwise 1
    Des  string //description
}


type BillChaincode struct {
}

func getRetByte(code int,des string) []byte {
    var r chaincodeRet
    r.Code = code
    r.Des = des

    b,err := json.Marshal(r)

    if err!=nil {
        fmt.Println("marshal Ret failed")
        return nil
    }
    return b
}

func getRetString(code int,des string) string {
    var r chaincodeRet
    r.Code = code
    r.Des = des

    b,err := json.Marshal(r)

    if err!=nil {
        fmt.Println("marshal Ret failed")
        return ""
    }
	chaincodeLogger.Infof("%s",string(b[:]))
    return string(b[:])
}

func (a *BillChaincode) getBill(stub shim.ChaincodeStubInterface,bill_No string) (Bill, bool) {
	var bill Bill
	key := Bill_Prefix + bill_No
	b,err := stub.GetState(key)
	if b==nil {
		return bill, false
	}
	err = json.Unmarshal(b,&bill)
	if err!=nil {
		return bill, false
	}
	return bill, true
}

func (a *BillChaincode) putBill(stub shim.ChaincodeStubInterface, bill Bill) ([]byte, bool) {

	byte,err := json.Marshal(bill)
	if err!=nil {
		return nil, false
	}

	err = stub.PutState(Bill_Prefix + bill.BillInfoID, byte)
	if err!=nil {
		return nil, false
	}
	return byte, true
}

// Init is called during chaincode instantiation to initialize any
// data. Note that chaincode upgrade also calls this function to reset
// or to migrate data.
func (a *BillChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// 0 - {Bill Object}
func (a *BillChaincode) issue(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)!=1 {
		res := getRetString(1,"ChainnovaChaincode Invoke issue args!=1")
		return shim.Error(res)
	}

	var bill Bill
	err := json.Unmarshal([]byte(args[0]), &bill)
	if err!=nil {
		res := getRetString(1,"ChainnovaChaincode Invoke issue unmarshal failed")
		return shim.Error(res)
	}
	bill.BillInfoID = fmt.Sprintf("%d", time.Now().UnixNano())
	bill.State = BillInfo_State_NewPublish

	_, bl := a.putBill(stub, bill)
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke issue put bill failed")
		return shim.Error(res)
	}

	holderNameBillNoIndexKey, err := stub.CreateCompositeKey(IndexName, []string{bill.Hodr_CmId, bill.BillInfoID})
	if err != nil {
		res := getRetString(1,"ChainnovaChaincode Invoke issue put search table failed")
		return shim.Error(res)
	}

	stub.PutState(holderNameBillNoIndexKey, []byte{0x00})

	res := getRetByte(0,"invoke issue success")
	return shim.Success(res)
}

//  0 - Bill_No ; 1 - Endorser CmId ; 2 - Endorser Acct
func (a *BillChaincode) endorse(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)<3 {
		res := getRetString(1,"ChainnovaChaincode Invoke endorse args<3")
		return shim.Error(res)
	}

	bill, bl := a.getBill(stub, args[0])
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke endorse get bill error")
		return shim.Error(res)
	}

	bill.WaitEndorser_CmId = args[1]
	bill.WaitEndorser_Acct = args[2]
	bill.State = BillInfo_State_EndrWaitSign

	_, bl = a.putBill(stub, bill)
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke endorse put bill failed")
		return shim.Error(res)
	}

	holderNameBillNoIndexKey, err := stub.CreateCompositeKey(IndexName, []string{bill.WaitEndorser_CmId, bill.BillInfoID})
	if err != nil {
		res := getRetString(1,"ChainnovaChaincode Invoke endorse put search table failed")
		return shim.Error(res)
	}

	stub.PutState(holderNameBillNoIndexKey, []byte{0x00})

	res := getRetByte(0,"invoke endorse success")
	return shim.Success(res)
}

//  0 - Bill_No ; 1 - Endorser CmId ; 2 - Endorser Acct
func (a *BillChaincode) accept(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)<3 {
		res := getRetString(1,"ChainnovaChaincode Invoke accept args<3")
		return shim.Error(res)
	}

	bill, bl := a.getBill(stub, args[0])
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke accept get bill error")
		return shim.Error(res)
	}

    // remove old holder_id from search table
	holderNameBillNoIndexKey, err := stub.CreateCompositeKey(IndexName, []string{bill.Hodr_CmId, bill.BillInfoID})
	if err != nil {
		res := getRetString(1,"ChainnovaChaincode Invoke accept put search table failed")
		return shim.Error(res)
	}
	stub.DelState(holderNameBillNoIndexKey)

	bill.Hodr_CmId = args[1]
	bill.Hodr_Acct = args[2]
	bill.WaitEndorser_CmId = ""
	bill.WaitEndorser_Acct = ""
	bill.State = BillInfo_State_EndrSigned

	_, bl = a.putBill(stub, bill)
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke accept put bill failed")
		return shim.Error(res)
	}

	res := getRetByte(0,"invoke accept success")
	return shim.Success(res)
}

//  0 - Bill_No ; 1 - Endorser CmId ; 2 - Endorser Acct
func (a *BillChaincode) reject(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)<3 {
		res := getRetString(1,"ChainnovaChaincode Invoke reject args<3")
		return shim.Error(res)
	}

	bill, bl := a.getBill(stub, args[0])
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke reject get bill error")
		return shim.Error(res)
	}

	// remove endorser_id from search table
	holderNameBillNoIndexKey, err := stub.CreateCompositeKey(IndexName, []string{args[1], bill.BillInfoID})
	if err != nil {
		res := getRetString(1,"ChainnovaChaincode Invoke reject put search table failed")
		return shim.Error(res)
	}
	stub.DelState(holderNameBillNoIndexKey)

	bill.WaitEndorser_CmId = ""
	bill.WaitEndorser_Acct = ""
	bill.State = BillInfo_State_EndrReject

	_, bl = a.putBill(stub, bill)
	if !bl {
		res := getRetString(1,"ChainnovaChaincode Invoke reject put bill failed")
		return shim.Error(res)
	}

	res := getRetByte(0,"invoke accept success")
	return shim.Success(res)
}

//  0 - Holder or Endorser CmId ;
func (a *BillChaincode) queryMyBill(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)!=1 {
		res := getRetString(1,"ChainnovaChaincode queryMyBill args!=1")
		return shim.Error(res)
	}

	billsIterator, err := stub.GetStateByPartialCompositeKey(IndexName, []string{args[0]})
	if err != nil {

	}
	defer billsIterator.Close()

	var billList = []Bill{}

	for billsIterator.HasNext() {
		kv, _ := billsIterator.Next()

		//var bill Bill
		//err := json.Unmarshal(kv.Value, &bill)
		//if err != nil {
		//	chaincodeLogger.Infof("%s",string(kv.Value[:]))
		//	continue
		//}
		_, compositeKeyParts, err := stub.SplitCompositeKey(kv.Key)
		if err != nil {
			fmt.Println("SplitCompositeKey error:", err)
			continue
		}

		bill, bl := a.getBill(stub, compositeKeyParts[1])
		if !bl {
			res := getRetString(1,"ChainnovaChaincode queryMyBill get bill error")
			return shim.Error(res)
		}
		billList = append(billList, bill)
	}

	b, err := json.Marshal(billList)
	if err != nil {
		e := fmt.Sprintf("ChainnovaChaincode Marshal queryMyBill billList error:%s", err)
		return shim.Error(e)
	}
	return shim.Success(b)
}

//  0 - Bill_No ;
func (a *BillChaincode) queryByBillNo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args)!=1 {
		res := getRetString(1,"ChainnovaChaincode queryByBillNo args!=1")
		return shim.Error(res)
	}

	bill, bl := a.getBill(stub, args[0])
	if !bl {
		res := getRetString(1,"ChainnovaChaincode queryByBillNo get bill error")
		return shim.Error(res)
	}

	// Get History
	resultsIterator, err := stub.GetHistoryForKey(Bill_Prefix+args[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var history []HistoryItem
	var hisBill Bill
	for resultsIterator.HasNext() {
		historyData, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		var hisItem HistoryItem
		hisItem.TxId = historyData.TxId //copy transaction id over
		json.Unmarshal(historyData.Value, &hisBill) //un stringify it aka JSON.parse()
		if historyData.Value == nil {              //marble has been deleted
			var emptyBill Bill
			hisItem.Bill = emptyBill //copy nil marble
		} else {
			json.Unmarshal(historyData.Value, &hisBill) //un stringify it aka JSON.parse()
			hisItem.Bill = hisBill                          //copy marble over
		}
		history = append(history, hisItem) //add this tx to the list
	}
	bill.History = history

	b, err := json.Marshal(bill)
	if err != nil {
		e := fmt.Sprintf("ChainnovaChaincode Marshal queryByBillNo billList error:%s", err)
		return shim.Error(e)
	}
	return shim.Success(b)
}



func (a *BillChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
    function,args := stub.GetFunctionAndParameters()
	chaincodeLogger.Info("%s%s","ChainnovaChaincode function=",function)
	chaincodeLogger.Info("%s%s","ChainnovaChaincode args=",args)

    // invoke
    if function == "issue" {
        return a.issue(stub, args)
    } else if function == "endorse" {
        return a.endorse(stub, args)
    } else if function == "accept" {
        return a.accept(stub, args)
    } else if function == "reject" {
        return a.reject(stub, args)
    }
	// query
	if function == "queryMyBill" {
		return a.queryMyBill(stub, args)
	} else if function == "queryByBillNo" {
		return a.queryByBillNo(stub, args)
	}

    res := getRetString(1,"ChainnovaChaincode Unkown method!")
	chaincodeLogger.Info("%s",res)
	chaincodeLogger.Infof("%s",res)
    return shim.Error(res)
}



func main() {
    if err := shim.Start(new(BillChaincode)); err != nil {
        fmt.Printf("Error starting BillChaincode: %s", err)
    }
}