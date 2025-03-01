import * as Yup from "yup";
import { ProjectInitialValue, ProjectListData } from "@/Type/Application/ProjectList/ProjectList";

export const projectData: ProjectListData[] = [
  {
    id: 1,
    title: "Chess Champs Website",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://www.chesschamps.us",
    admin:"https://www.chesschamps.us",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"",
    git_backend:"https://github.com/ComplianceFrontiers/ChessChamps",
    git_frontend:"https://github.com/ComplianceFrontiers/ChessChamps",
    description: "Endless Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "12",
    resolved: "5",
    comment: "7",
    like: "10",
    progress: 70,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 2,
    title: "Dvlc Website",
    badge: "Dvlc",
    image: "3.jpg",
    sites: "https://lions-club-demo.vercel.app/",
    admin:"https://lions-club-demo.vercel.app/",
    backend:"https://hotel-website-backend-eosin.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/HotelWebsite/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/HotelWebsiteBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/HotelBookingWebsite",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",   
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "secondary",
  },
  {
    id: 3,
    title: "Chess in school",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chess-in-school.vercel.app/",
    admin:"https://chess-in-school.vercel.app/admin",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chess-in-school",
    description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "success",
  },
  {
    id: 4,
    title: "Mpes Registration Form",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chesschampsus.vercel.app/mpes",
    admin:"https://chesschampsus.vercel.app/admin1",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chessprogramform",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 10,
    title: "Chess Champs Academy Access",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chesschampsus.vercel.app/mpes",
    admin:"https://chesschampsus.vercel.app/admin1",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chessprogramform",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 5,
    title: "Lombardy Registration Form",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chesschampsus.vercel.app/lombardy",
    admin:"https://chesschampsus.vercel.app/admin1",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chessprogramform",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 5,
    title: "JCC Registration Form",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chesschampsus.vercel.app/JCC_ChessChamps",
    admin:"https://chesschampsus.vercel.app/admin1",
    backend:"https://backend-chess-tau.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chessprogramform",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 6,
    title: "Chess Club Registration(Tournament)",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chess-champs-club.vercel.app/",
    admin:"https://chess-champs-club.vercel.app/admin",
    backend:"https://payment-form-backend.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessclub/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/PaymentFormBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/ChessClubFrontend",
    description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "success",
  },
  {
    id: 6,
    title: "Chess Club Middle Town Registration(Tournament)",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chess-champs-club.vercel.app/middletown",
    admin:"https://chess-champs-club.vercel.app/admin",
    backend:"https://payment-form-backend.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessclub/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/PaymentFormBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/ChessClubFrontend",
    description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "success",
  },
  {
    id: 6,
    title: "Chess Club pennsylvania Registration(Tournament)",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chess-champs-club.vercel.app/PA",
    admin:"https://chess-champs-club.vercel.app/admin",
    backend:"https://payment-form-backend.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessclub/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/PaymentFormBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/ChessClubFrontend",
    description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "success",
  },
  {
    id: 6,
    title: "Chessmate ",
    badge: "ChessChamps",
    image: "3.jpg",
    sites: "https://chessmatedemo.vercel.app/",
    admin:"https://chess-champs-club.vercel.app/admin",
    backend:"https://payment-form-backend.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessclub/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/PaymentFormBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/ChessClubFrontend",
    description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "success",
  },
  {
    id: 7,
    title: "Belleve Community Center",
    badge: "Bcc",
    image: "3.jpg",
    sites: "https://hotel-booking-website-chi.vercel.app/",
    admin:"https://hotel-booking-website-chi.vercel.app/admin",
    backend:"https://hotel-website-backend-eosin.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/HotelWebsite/users/find",
    git_backend:"https://github.com/ComplianceFrontiers/HotelWebsiteBackend",
    git_frontend:"https://github.com/ComplianceFrontiers/HotelBookingWebsite",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 8,
    title: "Zoho Clone",
    badge: "ComplianceFrontiers",
    image: "3.jpg",
    sites: "https://demo4-rose.vercel.app/zoho",
    admin:"https://demo4-rose.vercel.app/zoho",
    backend:"https://demo4-backend.vercel.app/",
    database:"https://cloud.mongodb.com/v2/66ab2971f436b6223d46698d#/metrics/replicaSet/66ab2a4d8bb8cb0264e99203/explorer/zoho_db",
    git_backend:"https://github.com/ramya72002/demo4Backend",
    git_frontend:"https://github.com/ramya72002/demo4",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
  {
    id: 9,
    title: "Bluk Email",
    badge: "BulkEmail",
    image: "3.jpg",
    sites: "https://chesschampsus.vercel.app/get_subscribers",
    admin:"https://chesschampsus.vercel.app/subscribe",
    backend:"https://github.com/ComplianceFrontiers/backendChess",
    database:"https://cloud.mongodb.com/v2/66ffe6301c0e245da4a25cb0#/metrics/replicaSet/66ffeb5e5be92e5803e579c8/explorer/chessschool/kids/find",
    git_backend:"https://github.com/ComplianceFrontiers/backendChess",
    git_frontend:"https://github.com/ComplianceFrontiers/chessprogramform",
    description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_image1: "3.jpg",
    customers_image2: "5.jpg",
    customers_image3: "1.jpg",
    color: "primary",
  },
];

export const projectInitialValue: ProjectInitialValue = {
  title: "",
  client: "",
  progress: 0,
  type: "",
  priority: "",
  size: "",
  description: "",
};

export const projectValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  client: Yup.string().required("Client Name is required"),
  description: Yup.string().required("Some Details is required"),
  progress: Yup.number().required("Between 0 to 100").max(100),
});