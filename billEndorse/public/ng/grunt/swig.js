module.exports = {
  html: {
    init: {
        autoescape: false
    },
    dest: 'html/',
    src: ['swig/*.swig'],
    production: false,
    generateSitemap: false,
    generateRobotstxt: false,
    build: true,
    showSpline: true,
    app: {
      name: 'Angulr',
      version: '2.2.0',
      color: {
        primary: '#7266ba',
        info:    '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger:  '#f05050',
        light:   '#e8eff0',
        dark:    '#3a3f51',
        black:   '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-black',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: false,
        asideFolded: false,
        asideDock: false,
        container: false
      }
    },
    x: 3,
    d3_1: '[ 106,108,110,105,110,109,105,104,107,109,105,100,105,102,101,99,98 ]',
    d3_2: '[ 105,102,106,107,105,104,101,99,98,109,105,100,108,110,105,110,109 ]',
    d3_3: '[60,40]',
    d: '[ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ]',
    d0_1: '[ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ]',
    d0_2: '[ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ]',
    d1_1: '[ [10, 120], [20, 70], [30, 70], [40, 60] ]',
    d1_2: '[ [10, 50],  [20, 60], [30, 90],  [40, 35] ]',
    d1_3: '[ [10, 80],  [20, 40], [30, 30],  [40, 20] ]',
    d2: '[ [10, 80],  [20, 40], [30, 30],  [40, 20] ]',
    d3: '[ [10, 80],  [20, 40], [30, 30],  [40, 20] ]',
    d4: '[ [1,5.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7],[13,2.5],[14,3.5],[15,7],[16,7],[17,6],[18,7],[19,6.8],[20,5],[21,7],[22,8],[23,6.8],[24,7] ]',
    usa_markers: "[{latLng: [40.71, -74.00], name: 'New York'},{latLng: [34.05, -118.24], name: 'Los Angeles'},{latLng: [41.87, -87.62], name: 'Chicago'},{latLng: [29.76, -95.36], name: 'Houston'},{latLng: [39.95, -75.16], name: 'Philadelphia'},{latLng: [38.90, -77.03], name: 'Washington'},{latLng: [37.36, -122.03], name: 'Silicon Valley'}]",
    world_markers : "[{latLng: [41.90, 12.45], name: 'Vatican City'},{latLng: [43.73, 7.41], name: 'Monaco'},{latLng: [-0.52, 166.93], name: 'Nauru'},{latLng: [-8.51, 179.21], name: 'Tuvalu'},{latLng: [43.93, 12.46], name: 'San Marino'},{latLng: [47.14, 9.52], name: 'Liechtenstein'},{latLng: [7.11, 171.06], name: 'Marshall Islands'},{latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},{latLng: [3.2, 73.22], name: 'Maldives'},{latLng: [35.88, 14.5], name: 'Malta'},{latLng: [12.05, -61.75], name: 'Grenada'},{latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},{latLng: [13.16, -59.55], name: 'Barbados'},{latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},{latLng: [-4.61, 55.45], name: 'Seychelles'},{latLng: [7.35, 134.46], name: 'Palau'},{latLng: [42.5, 1.51], name: 'Andorra'},{latLng: [14.01, -60.98], name: 'Saint Lucia'},{latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},{latLng: [1.3, 103.8], name: 'Singapore'},{latLng: [1.46, 173.03], name: 'Kiribati'},{latLng: [-21.13, -175.2], name: 'Tonga'},{latLng: [15.3, -61.38], name: 'Dominica'},{latLng: [-20.2, 57.5], name: 'Mauritius'},{latLng: [26.02, 50.55], name: 'Bahrain'},{latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}]",
    val: 5
  },
  landing: {
    init: {
        autoescape: false
    },
    dest: 'landing/',
    src: ['landing/*.swig'],
    generateSitemap: false,
    generateRobotstxt: false,
    build: true
  }
}
