import { View, Text, StyleSheet } from "react-native"

const SacredSplash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Sacred Realm</Text>
      <Text style={styles.contactInfo}>Aziza Okoro: (205) 390-7506</Text>
      {/* rest of code here */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 18,
    color: "#333",
  },
})

export default SacredSplash
