@REQ_TDRAF-115, @REQ_TDRAF-120
Feature: Admin feature
    As a user, I can sign in.
    As a user, I can reset my password when I forgot it.

    Background:
      #@PRECOND_TDRAF-145
      Given User have registered account
      And acouut is chauvu
      And "password" is "abC#123"
      And Email is "vuminhchaucyberlogictec@gamil.com"
    
    @TEST_TDRAF-141
    Scenario Outline: Sign in unsuccessfully
      Given User is in the "Login Page"
      When User input <userID>, <Password>
      And User click on the "Sign" button
      Then User can NOT sign in
      And There is a <message>
  
      Examples:
        | userID | Password | message                        |
        | chauvu | abC      | Invalid User name and Password | 
        | chauvU | abC#123  | Invalid User name and Password |
        |        |          | Invalid User name and Password |

    #AC2
    @TEST_TDRAF-142
    Scenario Outline: Sign in successfully
      Given User is in the "Login Page"
      When User input <userID>, <Password>
      And User click on the "Sign" button
      Then There is a message "Welcome!"
      And User go to the "Task List"
  
      Examples:
        | userID     | Password   |
        | chauvu     | abC#123    |
        | manhnguyen | 123456abc# |
    
    #AC4: Forgot password 
    @TEST_TDRAF-143
    Scenario Outline: Reset Password successfully
      Given User is at the "Change Password Page"
      When User input <Email>, new <password>, confirm <password>
      And User click on the "Reset Password" button
      Then There is a <message>
      And User back to "Login page"

      Examples:
        | Email                             | Password | message                     |
        | vuminhchaucyberlogictec@gamil.com | 12345678 | Reset Password Successfully |

    @@TEST_TDRAF-144
    Scenario Outline: Reset Password unsuccessfully
      Given User is at the "Change Password Page"
      When User input <Email>, new <password>, <confirm_password>
      And User click on the "Reset Password" button
      Then There is a <message>

      Examples:
        | Email                             | password  | confirm_password | message                                  |
        |                                   |           |                  | Please input Email                       |
        | vuminhchaucyberlogictec           |           |                  | Invalid Email, Please input new password |                    |
        | vuminhchaucyberlogictec@gamilcom  |           |                  | Please input new Password                |
        | vuminhchaucyberlogictec@gamil.com | 123456    |                  | Invalid password                         |
        | vuminhchaucyberlogictec@gamil.com | 123456aB@ |                  | Please confirm password                  |
        | vuminhchaucyberlogictec@gamilcom  | 123456aB@ | 123456aB         | Confirm password is Invalid              |                   

