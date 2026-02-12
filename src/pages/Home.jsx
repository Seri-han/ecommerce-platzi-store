import { useState, useEffect } from 'react';
import { platziApi } from '../api/platziApi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/globals.scss';
