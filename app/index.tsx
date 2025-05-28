import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Dashboard() {
  // Datos de ejemplo para los cuadros del grid
  const gridData = [
    { id: 1, title: 'Temperatura', value: '24 C' },
    { id: 2, title: 'Humedad', value: '50%' },
    { id: 3, title: 'Distancia', value: '23 cm' },
    { id: 4, title: 'Luz', value: '76%' },
    { id: 5, title: 'Humedad suelo', value: '88%' },
    { id: 6, title: 'Reportes', value: '7' },
  ];

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Cambiado para 2 columnas
  },
  gridItem: {
    width: '50%', // 2 columnas
    aspectRatio: 1, // Cuadrados
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  gridTitle: {
    fontSize: 16,
    color: '#555',
  },
  gridValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Dashboard</Text>
      <View style={styles.grid}>
        {gridData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.gridItem}>
            <Text style={styles.gridTitle}>{item.title}</Text>
            <Text style={styles.gridValue}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    
  );

  
}