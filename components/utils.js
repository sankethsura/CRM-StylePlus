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
    active: true,
  },
  {
    name: "About",
    path: "/dashboard/about",
    active: true,
  },
  {
    name: "Latest Work",
    path: "/dashboard/latest-work",
    active: false,
  },
  {
    name: "Our Services",
    path: "/dashboard/our-services",
    active: false,
  },
  {
    name: "Testimonials",
    path: "/dashboard/testimonials",
    active: false,
  },
];
