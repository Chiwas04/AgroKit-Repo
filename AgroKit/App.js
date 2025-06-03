import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { database, ref, onValue } from './firebase';

export default function SensorDashboard() {
  const [sensorData, setSensorData] = useState({
    HumA: "--",
    HumS_data: "--",
    Temp_data: "--",
    Luz_data: "--"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(database, 'Sensores');
    
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSensorData({
          HumA: data.HumA || "--",
          HumS_data: data.HumS_data || "--",
          Temp_data: data.Temp_data || "--",
          Luz_data: data.Luz_data || "--"
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sensorCards = [
    {
      key: 'temp',
      title: 'Temperatura',
      value: sensorData.Temp_data,
      unit: '°C',
      icon: 'temperature-high',
      color: '#e74c3c'
    },
    {
      key: 'air-hum',
      title: 'Humedad Aire',
      value: sensorData.HumA,
      unit: '%',
      icon: 'wind',
      color: '#3498db'
    },
    {
      key: 'soil-hum',
      title: 'Humedad Suelo',
      value: sensorData.HumS_data,
      unit: '%',
      icon: 'seedling',
      color: '#27ae60'
    },
    {
      key: 'light',
      title: 'Intensidad Lumínica',
      value: sensorData.Luz_data,
      unit: '%',
      icon: 'sun',
      color: '#f39c12'
    },
    // Espacios vacíos
    { key: 'empty1', isEmpty: true },
    { key: 'empty2', isEmpty: true }
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Monitoreo de Sensores</Text>
          <Text style={styles.subHeader}>Datos en tiempo real</Text>
        </View>

        <View style={styles.gridContainer}>
          {sensorCards.map((card) => (
            <View 
              key={card.key} 
              style={[
                styles.card, 
                card.isEmpty ? styles.emptyCard : styles.dataCard
              ]}
            >
              {!card.isEmpty && (
                <>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 
                      name={card.icon} 
                      size={28} 
                      color={card.color} 
                    />
                  </View>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardValue}>
                    {card.value}
                    <Text style={styles.unit}>{card.unit}</Text>
                  </Text>
                </>
              )}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Última actualización: {new Date().toLocaleTimeString()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d'
  },
  headerContainer: {
    marginBottom: 24,
    paddingTop: 10
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 6
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%', // 2 columnas con espacio entre ellas
    aspectRatio: 1, // Mantener cuadrados
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  dataCard: {
    backgroundColor: '#ffffff'
  },
  emptyCard: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ecf0f1'
  },
  iconContainer: {
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 8
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50'
  },
  unit: {
    fontSize: 20,
    fontWeight: '500'
  },
  footer: {
    marginTop: 24,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1'
  },
  footerText: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center'
  }
});