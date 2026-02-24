export type Project = {
  id: string;
  title: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "img1",
    title: "Modern Kitchen Fitment",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Image1.jpeg",
    imageAlt: "Kitchen installation project photo",
  },
  {
    id: "img2",
    title: "Built-in Cupboards & Storage",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img2.jpeg",
    imageAlt: "Built-in cupboards and storage project photo",
  },
  {
    id: "img3",
    title: "Contemporary Kitchen Details",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img3.jpeg",
    imageAlt: "Kitchen cabinetry and finishes project photo",
  },
  {
    id: "img4",
    title: "Clean Lines & Finishes",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img4.jpeg",
    imageAlt: "Kitchen project photo",
  },
  {
    id: "img5",
    title: "Storage That Works",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img5.jpeg",
    imageAlt: "Cupboards project photo",
  },
  {
    id: "img6",
    title: "Premium Fitment",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img6.jpeg",
    imageAlt: "Kitchen installation project photo",
  },
  {
    id: "img7",
    title: "Modern Cabinetry",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img7.jpeg",
    imageAlt: "Kitchen cabinetry project photo",
  },
  {
    id: "img8",
    title: "Built-in Cupboards",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img8.jpeg",
    imageAlt: "Built-in cupboards project photo",
  },
  {
    id: "img9",
    title: "Kitchen & Storage Solutions",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img9.jpeg",
    imageAlt: "Kitchen and cupboard project photo",
  },
  {
    id: "img10",
    title: "Finishing Touches",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img10.jpeg",
    imageAlt: "Kitchen finishes project photo",
  },
  {
    id: "img11",
    title: "Custom Installation",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img11.jpeg",
    imageAlt: "Custom kitchen installation project photo",
  },
  {
    id: "img12",
    title: "Modern Layout",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img12.jpeg",
    imageAlt: "Modern kitchen layout project photo",
  },
  {
    id: "img13",
    title: "Cupboard Design",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img13.jpeg",
    imageAlt: "Cupboard design project photo",
  },
  {
    id: "img14",
    title: "Refined Cabinetry",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img14.jpeg",
    imageAlt: "Cabinetry project photo",
  },
  {
    id: "img15",
    title: "Quality Craftsmanship",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img15.jpeg",
    imageAlt: "Kitchen craftsmanship project photo",
  },
  {
    id: "img16",
    title: "Built to Last",
    location: "Pretoria North",
    imageSrc: "/projects/Images/Img16.jpeg",
    imageAlt: "Kitchen project photo",
  },
];

export const featuredProjects = projects.slice(0, 3);
