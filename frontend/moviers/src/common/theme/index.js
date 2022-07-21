const primaryLight = {
    p1: "rgba(166,212,250,0.7)",
    p2: "rgba(166,212,250,0.5)",
    p3: "rgba(166,212,250,0.2)",
}

const primaryDark = {
    p1: "rgba(255, 255, 255, 0.7)",
    p2: "rgba(255,255,255,0.1)",
    p3: "rgba(255, 255, 255, 0.5)",

}

const theme = {
    lightTheme: {
        backgroundColor: "#F6F9FC",
        backgroundColor1: "white",
        color: "#2B3445",
        primary: primaryLight,
    },
    darkTheme: {
        backgroundColor: "#282c34",
        backgroundColor1: "#171F2E",
        color: "#CCCCCC",
        primary: primaryDark,
    }
}

export default theme;