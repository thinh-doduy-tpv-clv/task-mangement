@REQ_TDRAF-115, @REQ_TDRAF-120
Feature: Admin feature
    As a new user, I can register my account
    
    Background: user does NOT have account before
      Given A new user, they do NOT have account in Task Management

    @id: 1
    Scenario: Access the Register Page
      Given User is in the "Login Page"
      When User click on the "Create Account"
      Then User go to the "Register Page"

    # Validation the data in the textbox
    @id: 2
    Scenario Outline: Create a new account unsuccessfully
      Given User is in the "Register Page" 
      When User input <userID>, <Password>, <Email>
      And User click on the "Submit" button
      Then There is a <message> in below the textbox
        
      Examples:
        | userID   | Password | Email       | message                                                           |
        | ChauVu   | 123abc   |  abc        | Email is invalid                                                  |
        | chauvu   | chauvu   |             | Please input Email                                                |
        |          |          |             | Please input User name; Please input password; Please input Email |
        | chauvu   |          |             | Please input password; Please input Email                         |
        | chau1vu  | abc1     | abc@dou.net | User name is invalid                                              |
        | chau1vu# | abca1#$  | abc@dou.net | User name is invalid                                              |
  
    #AC1
    @id: 3
    Scenario Outline: Create a new account successfully
      Given User is in the "Register Page" 
      When User input <userID>, <Password>, <Email>
      And User click on the "Submit" button
      Then There is a msg "Create successfully"
      And User go to the "Login Page"

      Examples:
      | userID | Password | Email                             |
      | chauvu | abC#123  | vuminhchaucyberlogictec@gamil.com |