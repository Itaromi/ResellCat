import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function ExoPhotos() {
    const [mode, setMode] = useState("photo"); // "photo" ou "scanner"
    const [photoUri, setPhotoUri] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null);

    // 🔐 Demande automatique au premier rendu
    useEffect(() => {
        (async () => {
            if (!permission?.granted) await requestPermission();
            if (!mediaPermission?.granted) await requestMediaPermission();
        })();
    }, []);

    // 🛑 Si les permissions sont encore en cours de chargement
    if (!permission || !mediaPermission) {
        return (
            <View style={styles.center}>
                <Text>Chargement des permissions...</Text>
            </View>
        );
    }

    // ❌ Si l’utilisateur a refusé une des permissions
    if (!permission.granted || !mediaPermission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>
                    L'application a besoin d'accéder à la caméra et à la galerie pour fonctionner.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await requestPermission();
                        await requestMediaPermission();
                    }}
                >
                    <Text style={styles.buttonText}>🔓 Autoriser les accès</Text>
                </TouchableOpacity>

                <Text style={styles.hint}>
                    Vous pouvez aussi activer les permissions manuellement dans les réglages du téléphone.
                </Text>
            </View>
        );
    }

    // 🔍 QR Code détecté
    const handleBarCodeScanned = ({ data }) => {
        setScannedData(data);
        Alert.alert("QR Code détecté ✅", data);
    };

    // 📸 Prendre une photo
    const takePhoto = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
        } catch (err) {
            console.error(err);
            Alert.alert("Erreur", "Impossible de prendre la photo.");
        }
    };

    // 💾 Sauvegarder dans la galerie
    const savePhoto = async () => {
        try {
            const asset = await MediaLibrary.createAssetAsync(photoUri);
            await MediaLibrary.createAlbumAsync("ResellCat", asset, false);
            Alert.alert("📸 Photo enregistrée", "Ajoutée dans l’album ResellCat !");
        } catch (err) {
            console.error(err);
            Alert.alert("Erreur", "Impossible d'enregistrer la photo.");
        }
    };

    return (
        <View style={styles.container}>
            {!photoUri ? (
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    onBarcodeScanned={mode === "scanner" ? handleBarCodeScanned : undefined}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                >
                    {/* 🔄 Sélecteur de mode */}
                    <View style={styles.overlay}>
                        <TouchableOpacity
                            style={[styles.modeButton, mode === "photo" && styles.activeButton]}
                            onPress={() => setMode("photo")}
                        >
                            <Text style={styles.buttonText}>📷 Photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeButton, mode === "scanner" && styles.activeButton]}
                            onPress={() => setMode("scanner")}
                        >
                            <Text style={styles.buttonText}>🔍 Scanner</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 📸 Bouton de capture */}
                    {mode === "photo" && (
                        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                            <Text style={styles.captureText}>Prendre la photo</Text>
                        </TouchableOpacity>
                    )}
                </CameraView>
            ) : (
                // 📸 Preview après capture
                <View style={styles.preview}>
                    <Image source={{ uri: photoUri }} style={styles.imagePreview} />
                    <Text style={styles.watermark}>resellCat 🐾</Text>

                    <TouchableOpacity style={styles.button} onPress={savePhoto}>
                        <Text style={styles.buttonText}>💾 Enregistrer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "gray" }]}
                        onPress={() => setPhotoUri(null)}
                    >
                        <Text style={styles.buttonText}>↩️ Reprendre</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    infoText: {
        textAlign: "center",
        fontSize: 16,
        color: "#fff",
        marginBottom: 20,
    },
    hint: {
        color: "gray",
        fontSize: 13,
        textAlign: "center",
        marginTop: 10,
    },
    camera: { flex: 1 },
    overlay: {
        position: "absolute",
        top: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    modeButton: {
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    activeButton: { backgroundColor: "tomato" },
    captureButton: {
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
        backgroundColor: "tomato",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 50,
    },
    captureText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    button: {
        backgroundColor: "tomato",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    preview: { flex: 1, alignItems: "center", justifyContent: "center" },
    imagePreview: { width: "90%", height: "70%", borderRadius: 10 },
    watermark: {
        position: "absolute",
        bottom: 80,
        right: 30,
        color: "tomato",
        fontWeight: "bold",
        fontSize: 22,
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});