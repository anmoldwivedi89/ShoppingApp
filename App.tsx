import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView, 
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native';

// --- 1. DYNAMIC DATA (Database) ---
const CATEGORIES = ['All', 'Sneakers', 'Watch', 'Headphones', 'Bag'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Nike Air Jordan',
    price: '$140.00',
    category: 'Sneakers',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    name: 'Apple Watch S7',
    price: '$399.00',
    category: 'Watch',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    price: '$250.00',
    category: 'Headphones',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    name: 'Leather Backpack',
    price: '$89.99',
    category: 'Bag',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    name: 'Puma Running',
    price: '$75.00',
    category: 'Sneakers',
    rating: '4.2',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    name: 'Marshall Major',
    price: '$129.00',
    category: 'Headphones',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  // --- FILTER LOGIC ---
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(item => item.category === selectedCategory);

  // --- RENDER CATEGORY PILL ---
  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item;
    return (
      <TouchableOpacity 
        style={[styles.catItem, isSelected && styles.catItemSelected]}
        onPress={() => setSelectedCategory(item)}
      >
        <Text style={[styles.catText, isSelected && styles.catTextSelected]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // --- RENDER PRODUCT CARD ---
  const renderProduct = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
        
        <Image source={{ uri: item.image }} style={styles.productImage} />
        
        <View style={styles.textContainer}>
          <Text style={styles.prodName}>{item.name}</Text>
          <Text style={styles.prodCategory}>{item.category}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setCartCount(cartCount + 1)}
            >
              <Text style={styles.addSign}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, Anmol 👋</Text>
          <Text style={styles.titleText}>Find your style</Text>
        </View>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/44.jpg' }} 
          style={styles.avatar} 
        />
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          placeholder="Search for products..." 
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* 3. Category Filter List */}
      <View style={{ height: 60 }}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          keyExtractor={item => item}
          contentContainerStyle={styles.catList}
        />
      </View>

      {/* 4. Product Grid (2 Columns) */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2} // Grid Layout
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      {/* 5. Floating Cart Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={{fontSize: 24}}>👜</Text>
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    // Shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  // Categories
  catList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  catItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  catItemSelected: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  catText: {
    color: '#888',
    fontWeight: '600',
  },
  catTextSelected: {
    color: '#fff',
  },

  // Products Grid
  productList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: (width - 50) / 2, // Dynamic half-width
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 8, // Floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 10,
  },
  prodName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  prodCategory: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  addButton: {
    backgroundColor: '#1a1a1a',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSign: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4757',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }
});