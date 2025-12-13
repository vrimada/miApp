import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 5,
  },
  checkboxTick: {
    flex: 1,
    backgroundColor: "black",
  },
  checkboxText: {
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  OkButton: {
    backgroundColor: "#787878",
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
  },
  register: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  EditButton: {
    backgroundColor: "#F29B8A",
    paddingVertical: 12,
    borderRadius: 25,
  

  },
  saveButton: {
    backgroundColor: "#C0E080",
    paddingVertical: 12,
    borderRadius: 25,
  },
});

export default styles;