console.log('pqp');
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("cordova").innerHTML = device.cordova;
        document.getElementById("model").innerHTML = device.model;
        document.getElementById("platform").innerHTML = device.platform;
        document.getElementById("version").innerHTML = device.version;
        document.getElementById("manufacturer").innerHTML = device.manufacturer;
        document.getElementById("net").innerHTML = navigator.connection.type;
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function(position){
       document.getElementById("latitude").innerHTML = position.coords.latitude;
        document.getElementById("longitude").innerHTML = position.coords.longitude;
    },


    alert: function(){
        navigator.notification.alert(
            'Registro salvo',
            'Sucesso',
            'Ok'
        );
    },

    beep: function(){
        navigator.notification.beep(1);
    },



    // Update DOM on a Received Event
    receivedEvent: function(id) {
        window.addEventListener("batterystatus", onBatteryStatus, false);
        function onBatteryStatus(status){
            document.getElementById("level").innerHTML = status.level;
            document.getElementById("isPlugged").innerHTML = status.isPlugged;

        }
    }
}

function c1() {
    var a = document.getElementById("c1").value;
    console.log(a);
     $.ajax({
        url : "http://192.168.0.115/?luz1", // the endpoint
        type : "GET", // http method

        success : function(json) {
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

        }
    });

    if (document.getElementById("c1").value === 'on'){
        document.getElementById("c1").value = 'off';
    }else{
        document.getElementById("c1").value = 'on';
    };
};

function c2() {
    var a = document.getElementById("c2").value;
    console.log(a);

    $.ajax({
        url : "http://192.168.0.115/?luz2", // the endpoint
        type : "GET", // http method

        success : function(json) {
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

        }
    });

    if (document.getElementById("c2").value === 'on'){
        document.getElementById("c2").value = 'off';
    }else{
        document.getElementById("c2").value = 'on';
    };
};