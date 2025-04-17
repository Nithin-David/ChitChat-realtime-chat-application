import toast from "react-hot-toast";

export const validateForm = ({fullname, email, password}) => {

  if(!fullname || !email || !password){
    toast.error("All fields are required", {
      style: {
        border: "1px solid #d08e17",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
    return false;
  }

    if(!fullname.trim()){
        toast.error("Required fullname", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

    if(fullname.length < 3){
        toast.error("Fullname must be at least 3 characters", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

    if(!email.trim()){
        toast.error();
        ("Required email", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        toast.error("Invalid email", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

    if(!password.trim()){
        toast.error("Required password", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters", {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return false;
    }

    return true;

}