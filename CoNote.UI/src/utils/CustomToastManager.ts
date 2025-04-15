import toast from "react-hot-toast";

export const RenderSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "#7FFDB1",
      color: "#02933C",
    },
    iconTheme: {
      primary: "#02933C",
      secondary: "#F2F2F0",
    },
  });
};

export const RenderWarningToast = (message: string) => {
  toast(message, {
    icon: "⚠️",
    style: {
      backgroundColor: "#F7D290",
      color: "#966207",
    },
    iconTheme: {
      primary: "#966207",
      secondary: "#F2F2F0",
    },
    duration: 3000,
  });
};

export const RenderErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "#FD7F85",
      color: "#930209",
    },
    iconTheme: {
      primary: "#930209",
      secondary: "#F2F2F0",
    },
    duration: 3000,
  });
};
