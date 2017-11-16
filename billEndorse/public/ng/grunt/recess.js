module.exports = {
	less: {
        files: {
          'src/css/app.css': [
            'src/css/less/app.less'
          ],
          'src/css/md.css': [
            'src/css/less/md.less'
          ],
          'src/css/app.rtl.css': [
            'src/css/less/app.rtl.less'
          ]
        },
        options: {
          compile: true
        }
    },
    html: {
        files: {
            'html/css/app.min.css': [
                'src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
