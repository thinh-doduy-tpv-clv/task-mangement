@REQ_RDRAF-115 
Feature: Admin feature
    As a user, I can sign in.
    As a user, I can reset my password when I forgot it.

    Background:
      Given User have registered account
      And acouut is <userID>, <Password>, <Email>
      
      Examples:
      | userID     | Password   | Email                             |
      | chauvu     | abC#123    | vuminhchaucyberlogictec@gamil.com |
      | manhnguyen | 123456abc# | manhnguyen@gamil.com              |
    
    @id: 1
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
    @id: 2
    Scenario Outline: Sign in successfully
      Given User is in the "Login Page"
      When User input <userID>, <Password>
      And User click on the "Sign" button
      Then User go to the "Task List"
  
      Examples:
        | userID     | Password   |
        | chauvu     | abC#123    |
        | manhnguyen | 123456abc# |
    
    #AC4: Forgot password 
    @id: 3
    Scenario Outline: Reset Password successfully
      Given User is at the "Forgot Password Page"
      When User input <userID>, <Email>
      And User click on the "Submit" button
      Then There is a pop-up "Reset Password"
      And User input new <Password>
      And User verify it one more times

      Examples:
        | userID | Email                             | Password |
        | chauvu | vuminhchaucyberlogictec@gamil.com | 12345678 |

    @id: 4
    Scenario Outline: Reset Password unsuccessfully
      Given User is at the "Forgot Password Page"
      When User input <userID>, <Email>
      And User click on the "Submit" button
      Then User can NOT reset password
      And There is a <message>

      Examples:
        | userID | Email                             | message                          |
        |        |                                   | Please input user name and Email |
        | chauvu | vuminhchaucyberlogictec@gamilcom  | Invalid User name and Email      |
        | chauv  | vuminhchaucyberlogictec@gamil.com | Invalid User name and Email      |
        | chauv  | vuminhchaucyberlogictec@gamilcom  | Invalid User name and Email      |
    
    # Background: User sign in successfully
    #   Given User use account with <userID>, <Password>
    #   And User is in "Task List"

    #   Examples:
    #     | userID     | Password   |
    #     | chauvu     | abC#123    |

    # @id: 8
    # Scenario: Logout successfully
    #   When User click on the "Log out" button
    #   Then User go to the "Login Page"
    
    # @id: 9
    # Scenario Outline: Change password
    #   Given User openned the "Change Password" pop-up
    #   When User input old <Password>, new <Password>
    #   And User click on the "Submit" button
    #   Then there is a <message>
  
    #   Examples:
    #     | Password | Password | message                      |
    #     | abC#123  | abC$$123 | Chagne password successfully |
    #     | abC#12   | abC$$123 | Password invalid             |
    #     |          |          | Nothing change               |
