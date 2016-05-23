angular.module('BikeRoute')
.controller('MapController', function (NgMap) {
    var vm = this
    vm.path = [[]]
    vm.positions = vm.path

    vm.addMarkerAndPath = function (event) {
     vm.path.push([event.latLng.lat(), event.latLng.lng()])
     console.log(vm.positions);
    }

    vm.loadRoute = function () {
      var coor = [[],[13.691106146862403,-89.22640800476074],
      [13.691356322382264,-89.21919822692871],
      [13.68877116251188,-89.21370506286621],
      [13.684101124282016,-89.20529365539551],
      [13.691022754963313,-89.20701026916504],
      [13.697277065333209,-89.20846939086914],
      [13.696776726625743,-89.19877052307129],
      [13.69252380462292,-89.19550895690918],
      [13.689188125703035,-89.20297622680664]]

      for (var i = 0; i < coor.length; i++) {
        console.log(coor[i]);
        vm.path.push(coor[i])
      }
    }

    vm.deleteMarkers = function() {
      if(vm.path.length > 0){
        console.log(vm.path.length);
        vm.path.splice((vm.path.length-1), 1)
      }
      }

    vm.saveRoute = function () {
      var route = angular.toJson(vm.path)
    }


})
