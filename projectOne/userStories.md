# Project One - Tuition Reimbursement Management System 
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

## User Stories
* As an Employee (DS/DH/BenCo), I can login.--
* As an Employee, I can view my pending requests.--
* As an Employee, I can request a reimbursement.--
  * This means being able to fill out a form with all of the requirements listed above.
* As a Direct Supervisor, I can approve requests for reimbursement.
  * (and send them to the Department Head)
  * As a substory: I can send the request back to the Employee for additional information. 
* As a Department Head, I can approve requests for reimbursement.
  * (comes from DS and sends to BenCo)
  * As a substory: I can send the request back to either the Employee or DS for additional information.
* As a Benefit Coordinator, I can approve requests for reimbursement. 
  * (comes from DH and returns approval to Employee)
* As a DS/DH/BenCo, I can view the pending requests that need approval.--
* As a system, if the DH/DS do not approve the request in a timely manner, then I will auto approve the requests.
* As a system, I can auto approve requests and send them to the BenCo if an approval email is associated.
* As the BenCo, I can see the grades for the requests I have approved when they are uploaded.
* As a DS, I can see the presentations for the requests I have approved when they are uploaded.
* As an Employee, I can upload my grades or presentation. 