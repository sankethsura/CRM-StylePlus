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

export const SubNavMenu = [
  {
    name: "What We Do",
    path: "/dashboard",
  },
  {
    name: "About",
    path: "/dashboard/about",
  },
  {
    name: "Latest Work",
    path: "/dashboard/latest-work",
  },
  {
    name: "Our Services",
    path: "/dashboard/our-services",
  },
  {
    name: "Testimonials",
    path: "/dashboard/testimonials",
  },
];
