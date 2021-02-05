# projectOne - TRMS (Tuition Reimbursement Management System)
As I worked at Revature, this is my Project One which created a Tuition Reimbursement Management System. This is my project.  

## Overview
### Purpose
The TRMS provides reimbursements for uni courses, seminars, certification prep classes, certifications, and technical training. It needs to record and report on reimbursements awarded. 
### Rules
* Each Employee is allowed to claim up to `$1000` in tuition reimbursement a year. (Resets on the new year)
* Reimbursement Coverage
  * University Courses ... 80%
  * Seminars ...................... 60%
  * Cert Prep Classes ...... 75%
  * Cert ............................... 100%
  * Tech Training ................ 90%
  * Other ............................... 30%
* reimbursement is pending until a passing grade or presentation over the event is provided.
* Monetary value determined by this equation
  
    `Availablereimbursement = Totalreimbursement - Pendingreimbursements - Awardedreimbursements`
* A projected reimbursement will be adjusted if it exceeds the available reimbursement amount.
* reimbursements do not cover materials such as books
  
## Complete Tuition reimbursement Form
### Form Requirments
* Basic employee information
* date/time/location
* description
* cost
* grading format
* type of event
* work-related justification
### Optional Fields
* event related attachments
* attachments of approvals already provided
* work time that will be missed
* Projected reimbursement is a read-only field

### Rules
Grading formats are pulled from a reference table. Some formats require a presentation before a reimbursement is awarded. 
* If employee provides an approval email, then the approval step is skipped (not the BenCo approval)
* If the course < 2 weeks from starting, then the request is marked as urgent

## Direct Supervisor Approval
### Rules
The direct supervisor must provide approval. If denied, they must providea reason. If the Direct Supervisor is a department head, then the Department Head Approval is skipped. The Direct Supervisor must respond in a timely matter, otherwise, the system will auto approve the request. 

## Department Head Approval
### Rules
DH MUST provide approval for reimbursement. They can request additional information from Direct Supervisor or Employee before approval. If not completed in a timely manner, the request will auto approve. 

## Benefits Coordinator Approval
### Rules
BenCo must provide approval for reimbursement. This approval is NOT skippable for any reason. The BenCo can request information from the DH, DS, Employee. The BenCo can award an amount larger than the amount available, but there must be a reason provided. The reimbursement must be marked as exceeding available funds.

## Grade/Presentation Upload
### Rules
The employee must attach a grade or presentation for the reimbursemet. The BenCo must confirm the grade is passing. The Direct Supervisor must confirm that the presentation was satisfactory. Upon confirmation, the reimbursement is awarded to the employee.  
* Only interested parties should access the grades/presentations
  * ie: the requestor and the approvers. 
  
## How to Run
This will explain how to run the program.
1. Set up the .env files using the examples. You can use whichever ports you would like. These are examples.
2. Run the commands `cd .\projectOne\trms.clark` & `npm install`.
 * This will install all the dependencies in the backend.
3. Run the commands `cd ..\trms.clark-frontend` & `npm install`.
 * This will install all the dependencies in the frontend.
4. Now open two terminals, preferably side to side.
5. In one terminal, change the directory to `trms.clark` and run `npm run setup`.
 * This will create the database with some example users. 
6. In the other terminal, change the directory to `trms.clark-frontend` and run `npm run start`.
7. It should open a browser and you can play around with the program. 
