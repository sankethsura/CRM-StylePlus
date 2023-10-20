import moment from "moment";

export const contactSchema = (contact) => {
    const contactInfo = [
      {
        name: "Name",
        value: contact.fullname,
      },
      {
        name: "Email",
        value: contact.email,
      },
      {
        name: "Message",
        value: contact.message,
      },
      {
        name: "Phone Number",
        value: contact.phoneNumber,
      },
      {
        name: "Date",
        value: moment(contact.date).format("ll"),
      },
      {
        name: "Time",
        value: moment(contact.date).fromNow(),
      },
    ];
    return contactInfo;
  };
