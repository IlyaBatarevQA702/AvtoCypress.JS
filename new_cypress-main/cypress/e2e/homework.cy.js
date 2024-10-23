import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"




describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
          });
     
     
     it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный E-mail
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверка что после авт вижу текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })



     it('Неверный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный E-mail
        cy.get(main_page.password).type('iLoveqastudio2'); // Ввел Неверный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверка что "Войти" вижу данный текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })   
    
    

    it('Верный пароль и невалидный логин', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввел невалидный E-mail
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверка что "Войти" вижу данный текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })



    it('Верный пароль и неверный логин', function () {
        cy.get(main_page.email).type('German@dolnikov.ru'); // Ввел неверный E-mail
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверка что вижу данный текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })



    it('Забыли пароль Верная почта', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал на кнопку забыли пароль
        cy.get(recovery_password_page.email).type(data.login); // Ввел верный E-mail
        cy.get(recovery_password_page.send_button).click(); // Нажал на кнопку "Отправить код"
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверка что вижу данный текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })



    it('Забыли пароль Невалидную почту', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал на кнопку забыли пароль
        cy.get(recovery_password_page.email).type('germandolnikov.ru'); // Ввел невалидный E-mail
        cy.get(recovery_password_page.send_button).click(); // Нажал на кнопку "Отправить код"
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверка что вижу данный текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })
 })
 
 
