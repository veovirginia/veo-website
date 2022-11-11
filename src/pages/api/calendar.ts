import { google } from "googleapis"
import type { NextApiRequest, NextApiResponse } from "next"

const PARSED_CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const calendarId = process.env.CALENDAR_ID

const SCOPES = "https://www.googleapis.com/auth/calendar"
const calendar = google.calendar({ version: "v3" })

const auth = new google.auth.JWT(
   PARSED_CREDENTIALS.client_email,
   "",
   PARSED_CREDENTIALS.private_key,
   SCOPES
)

const TIMEOFFSET = "-05:00"

type Data = {
   name: string
}

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const dateTimeForCalander = () => {
      let date = new Date()

      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month < 10) {
         month = Number(`0${month}`)
      }
      let day = date.getDate()
      if (day < 10) {
         day = Number(`0${day}`)
      }
      let hour = date.getHours()
      if (hour < 10) {
         hour = Number(`0${hour}`)
      }
      let minute = date.getMinutes()
      if (minute < 10) {
         minute = Number(`0${minute}`)
      }

      let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`

      let event = new Date(Date.parse(newDateTime))

      let startDate = event
      // Delay in end time is 1
      let endDate = new Date(
         new Date(startDate).setHours(startDate.getHours() + 1)
      )

      return {
         start: startDate,
         end: endDate,
      }
   }

   // Insert new event to Google Calendar
   const insertEvent = async (event: any) => {
      try {
         const response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            requestBody: event,
         })
         if (response["status"] == 200 && response["statusText"] === "OK") {
            return 1
         } else {
            return 0
         }
      } catch (error) {
         console.log(`Error at insertEvent --> ${error}`)
         return 0
      }
   }

   let dateTime = dateTimeForCalander()
   console.log("date time: ", dateTime)

   // Event for Google Calendar
   let event = {
      summary: `Onboard Meeting`,
      description: `Meeting with [name here].`,
      start: {
         //2022-11-11T01:57:00.000Z, end: 2022-11-11T02:57:00.000Z
         dateTime: "2022-11-12T01:57:00.000Z",
         timeZone: "America/New_York",
      },
      end: {
         dateTime: "2022-11-12T02:57:00.000Z",
         timeZone: "America/New_York",
      },
   }

   insertEvent(event)
      .then((res) => {
         console.log(res)
      })
      .catch((err) => {
         console.log(err)
      })

   // Get all the events between two dates
   const getEvents = async (dateTimeStart: any, dateTimeEnd: any) => {
      try {
         let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: "America/New_York",
         })

         let items = response["data"]["items"]
         return items
      } catch (error) {
         console.log(`Error at getEvents --> ${error}`)
         return 0
      }
   }

   // let start = '2020-10-03T00:00:00.000Z';
   // let end = '2020-10-04T00:00:00.000Z';

   // getEvents(start, end)
   //     .then((res) => {
   //         console.log(res);
   //     })
   //     .catch((err) => {
   //         console.log(err);
   //     });

   // Delete an event from eventID
   //    const deleteEvent = async (eventId: any) => {
   //       try {
   //          let response = await calendar.events.delete({
   //             auth: auth,
   //             calendarId: calendarId,
   //             eventId: eventId,
   //          })

   //          if (response.data === "") {
   //             return 1
   //          } else {
   //             return 0
   //          }
   //       } catch (error) {
   //          console.log(`Error at deleteEvent --> ${error}`)
   //          return 0
   //       }
   //    }

   //    deleteEvent(eventId)
   //       .then((res) => {
   //          console.log(res)
   //       })
   //       .catch((err) => {
   //          console.log(err)
   //       })
   res.status(200).json({ name: "John Doe" })
}
