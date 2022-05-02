# Appointment App API

## Endpoints

### Add New Appointment

#### POST
`http://appointmentapi-env.eba-p2gbkhf2.us-east-1.elasticbeanstalk.com/appointments`

<details>
  <summary>Payload</summary>
  
  ```json
  {
    "name": "John Doe",
    "number": "024 123 ****",
    "cty_code": "+233",
    "email": "john.doe@mail.com",
  }
  ```
</details>

#### PUT
`http://appointmentapi-env.eba-p2gbkhf2.us-east-1.elasticbeanstalk.com/appointments/[:id]`
 
<details>
  <summary>Payload</summary>
  
  ```json
  {
    "name": "John Doe",
    "number": "024 123 ****",
    "cty_code": "+233",
    "email": "john.doe@mail.com",
    "topic": "Website Design",
    "short_desc": "Lorem ipsum dolor sit amet",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    "start": 163469704000,
    "duration": 3,
    "ref_code": "63dc0203",
    "verify": 1,
    "request": 1,
    "approval": 1,
  }
  ```
</details>




### Retrieve Appointments

#### GET

Single: `http://appointmentapi-env.eba-p2gbkhf2.us-east-1.elasticbeanstalk.com/appointments/[:id]`

All: `http://appointmentapi-env.eba-p2gbkhf2.us-east-1.elasticbeanstalk.com/appointments`

Search: `http://appointmentapi-env.eba-p2gbkhf2.us-east-1.elasticbeanstalk.com/appointment/s?q=[:search_text]`
<details>
  <summary>Additional Filters</summary>
    
| Filter | Description |
| ------ | ----------- |
| max_duration | Set upper limit for duration. `e.g. &maax_duration=3` |
| min_duration | Set lower limit for duration. `e.g. &min_duration=1` |
| duration | get specfic duration. `e.g. &duration=3` |
| start_date | Set start date. ***Note** Date should be in unix time* `e.g. &start_date=163469704000` |
| approval_status | Set approval status. `e.g. &approval_status=0` |
| before_date | Get all before a specific date. ***Note** Date should be in unix time* `e.g. &before_date=163469704000` |
</details>
