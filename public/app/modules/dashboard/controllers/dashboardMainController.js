'use strict';

angular.module('dashboard')
    .controller('DashboardMainController', [
        function(){

            this.activeTab = 1;

            this.isActiveTab = function (tabId){
                return this.activeTab == tabId;
            };

            this.selectTab = function (tabId){
                return this.activeTab = tabId;
            };


        }
    ]);