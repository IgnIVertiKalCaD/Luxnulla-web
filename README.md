# Arcania Frontend

 This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.1.0.

## Development se rver

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Стандарты:
1) Сайт имеет 2 версии - mobile/desktop. Mobile версия имеет полное право запрашивать service/state/types из desktop, так как они более оттестировано. 
Если для mobile не треубется логики, то mobile имеет у мебя ВСЕГДА ts файл компонента. Его и используйте для логики mobile, полностью вырезав зависимости от desktop.
Так будет удобнее для разработчика. Тесты проще, скорость написания кода выше. Никаких архитектурых проблем в будующем не вызовется, если спагетти не хуярить. Если mobile
запрашивает от desktop сервис для получения данных, а типы этих данных вы берёте из mobile, то это пиздец. Так делать запрещено.

import {Component} from '@angular/core';

import {RulesComponent as DesktopRulesComponent}  from "@/app/desktop/rules/rules.component";

@Component({
selector: 'app-rules',
templateUrl: './rules.component.html',
standalone: false
})
export class RulesComponent extends DesktopRulesComponent {}
