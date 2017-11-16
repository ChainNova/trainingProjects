'use strict';

angular.module('app').constant(
		'REST_URL', 
			{
			    // login
			    'login': '/login',
			    'logout': '/logout',

				// invoke
                'publishBill': '/channels/mychannel/chaincodes/mycc/invoke',
				'endrRequest': '/channels/mychannel/chaincodes/mycc/invoke',
				'endrResponse': '/channels/mychannel/chaincodes/mycc/invoke',
				// query
				'queryMyBill': '/channels/mychannel/chaincodes/mycc/query',
				'queryBillInfo': '/channels/mychannel/chaincodes/mycc/query',
				'queryMyUnBill': '/channels/mychannel/chaincodes/mycc/query',
				'queryBillHistInfo': '/channels/mychannel/chaincodes/mycc/query',

				'invoke': '/channels/mychannel/chaincodes/mycc/invoke',
				'query': '/channels/mychannel/chaincodes/mycc/query'

			}
	);