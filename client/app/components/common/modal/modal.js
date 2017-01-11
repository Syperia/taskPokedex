import angular from 'angular';
import { modalComponent } from './modal.component';

export const modal = angular.module('modal', [])
  .directive('modal', modalComponent);
