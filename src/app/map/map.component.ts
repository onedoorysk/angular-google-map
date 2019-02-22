import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  zoom = 16;
  INITIAL_POSTION = { lat: 40.80749028131467, lng: 140.4456687866397 };

  markerList = [
    { id: 1, lat: 40.7848351, lng: 140.45867769999995 },
  ];

  addressList = [
    { id: 1, name: '山田太郎', address: 'みどり町5-3県営住宅広田団地13' },
  ];

  name = '';
  address = '';

  location: object;

  constructor(private map: MapsService) { }

  ngOnInit() {
    this.lat = this.INITIAL_POSTION.lat;
    this.lng = this.INITIAL_POSTION.lng;
  }

  clickAddress(id) {
    const targetMarker = this.markerList.filter(marker => marker.id === id);
    this.lat = targetMarker[0].lat;
    this.lng = targetMarker[0].lng;
    console.log(this.zoom);
    this.zoom = 20;
  }

  register() {
    this.map.geocodeAddress(this.address)
      .subscribe(location => {
        this.markerList.push({
          id: this.markerList.slice(-1)[0].id + 1,
          lat: location.latitude,
          lng: location.longitude
        });
        this.addressList.push({
          id: this.addressList.slice(-1)[0].id + 1,
          name: this.name,
          address: this.address
        });
        this.name = '';
        this.address = '';
      }
    );
    console.log(this.markerList);
    console.log(this.addressList);
  }

  saveData() {
    console.log('this is save function');
  }

}
