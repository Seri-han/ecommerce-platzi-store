
export const getImageUrl = (product) => {
  if (!product) return null;

  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    for (let img of product.images) {
      const cleanUrl = String(img).replace(/^["']|["']$/g, '').trim();
      
      if (cleanUrl && (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://'))) {
        if (!cleanUrl.includes('placehold.co') && !cleanUrl.includes('placeholder')) {
          console.log('✅ Real image found:', cleanUrl);
          return cleanUrl;
        }
      }
    }
    
    const firstImg = String(product.images[0]).replace(/^["']|["']$/g, '').trim();
    if (firstImg && (firstImg.startsWith('http://') || firstImg.startsWith('https://'))) {
      console.log('⚠️ Using placeholder image:', firstImg);
      return firstImg;
    }
  }

  if (product.image && String(product.image).startsWith('http')) {
    console.log('✅ Using single image:', product.image);
    return product.image;
  }

  console.warn('❌ No image for product:', product.id, product.title);
  return null;
};