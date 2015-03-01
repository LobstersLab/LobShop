'use strict';

angular.module('core')
    .factory('StatelineFactory', ['$state',
        function StatelineFactory ($state) {
            function Stateline (config) {
                var self = this;

                self.states = config.states;
                self.completedStates = getStatesCompletion(config.states);
                self.activeState =  this.getActiveState();
                self.finalStateCallback = config.callback;

                config.scope.$on('$stateChangeSuccess', function () {
                    if (self.isStateDisabled(getCurrentStateName())) {
                        $state.go(config.baseState + self.activeState);
                    }
                });
            }

            function isStateCompleted (state) {
                var self = this;
                var indexOfState = self.states.indexOf(state);

                if (indexOfState > -1) {
                    return self.completedStates[indexOfState];
                } else {
                    console.error('State is not defined: ', state);
                }
            }

            function completeState (isFinalState) {
                var self = this;

                if (self.activeState === getCurrentStateName()) {
                    var indexOfActiveState = self.states.indexOf(self.activeState);

                    if (indexOfActiveState > -1) {
                        self.completedStates[indexOfActiveState] = true;

                        if (self.states[indexOfActiveState + 1]) {
                            self.activeState = self.states[indexOfActiveState + 1];
                        } else {
                            if (isFinalState) {
                                self.finalStateCallback();

                                ////TODO: Redirect to correct state
                                ////TODO: Empty the shopping cart
                                ////TODO: Handle error conrrectly
                            }
                            else {
                                console.log('All states are completed!');
                            }
                        }
                    }
                    else {
                        console.error('Cannot complete state: ', self.activeState);
                    }
                }
            }

            function isStateDisabled (stateName) {
                var self = this;

                if (stateName) {
                    return !self.isStateCompleted(stateName) && stateName !== this.activeState;
                } else {
                    console.error('State is not defined');
                }
            }

            function getActiveState () {
                var self = this;

                if (Array.isArray(self.states) && self.states.length > 0) {
                    return self.activeState || self.states[0];
                } else {
                    console.error('States are not defined!');
                }
            }

            function getCurrentStateName () {
                var currentState = $state.current;
                var currentStateName = currentState.name.split('.')[1];

                return currentStateName;
            }

            function getStatesCompletion (states) {
                var statesCompletion = [];

                var i = 0;
                while (i < states.length) {
                    statesCompletion.push(false);

                    i++;
                }

                return statesCompletion;
            }

            Stateline.prototype = {
                isStateCompleted: isStateCompleted,
                completeState: completeState,
                isStateDisabled: isStateDisabled,
                getActiveState: getActiveState
            };

            return Stateline;
        }
    ]);