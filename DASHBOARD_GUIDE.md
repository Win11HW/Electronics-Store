# Dashboard User Guide

## Overview
The Product Dashboard is your central hub for managing all products in the Flair Tech store. It provides an intuitive interface for adding, editing, and deleting products with real-time search and filtering capabilities.

## Accessing the Dashboard

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   ```
   http://localhost:3000/dashboard
   ```

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Home / Dashboard                                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Product Dashboard                          [+ Add Product]  │
│  Manage your product inventory                               │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Search: [Search products...]                                │
│  Filter: [All Categories ▼] Sort: [Most Popular ▼]          │
│  View: [Grid] [List]                                         │
│  Showing 28 of 28 products                                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [Product Card] [Product Card] [Product Card] [Product Card]│
│  [Product Card] [Product Card] [Product Card] [Product Card]│
│  [Product Card] [Product Card] [Product Card] [Product Card]│
│                                                               │
└───────────────────��─────────────────────────────────────────┘
```

## Features

### 1. Search Products
- **Location**: Top search bar
- **Function**: Search by product name or category
- **Real-time**: Results update as you type
- **Example**: Type "MacBook" to find all MacBook products

### 2. Filter by Category
- **Location**: Filter dropdown
- **Options**: All, Computers, Smartphones, Headphones, Cameras, Smartwatches
- **Function**: Show only products in selected category
- **Default**: All Categories

### 3. Sort Products
- **Location**: Sort dropdown
- **Options**:
  - Most Popular (by reviews)
  - Price: Low to High
  - Price: High to Low
  - Highest Rated
  - Name: A to Z
- **Default**: Most Popular

### 4. View Modes
- **Grid View**: Display products in a grid layout (default)
- **List View**: Display products in a list layout
- **Toggle**: Click grid or list icon to switch

### 5. Add Product
- **Button**: "+ Add Product" (top right)
- **Action**: Opens modal form
- **Fields**: See "Add Product Form" section below

### 6. Edit Product
- **Action**: Hover over product card
- **Button**: Edit icon (pencil) appears
- **Action**: Opens modal with product details pre-filled
- **Save**: Click "Update Product" to save changes

### 7. Delete Product
- **Action**: Hover over product card
- **Button**: Delete icon (trash) appears
- **Confirmation**: Confirm deletion in popup
- **Result**: Product is removed from database

## Add/Edit Product Form

### Form Fields

#### Required Fields (*)
1. **Product Name**
   - Type: Text input
   - Example: "iPhone 15 Pro Max"
   - Validation: Cannot be empty

2. **Category**
   - Type: Dropdown
   - Options: Computers, Smartphones, Headphones, Cameras, Smartwatches
   - Default: Computers

3. **Price**
   - Type: Number input
   - Example: 1199.99
   - Validation: Must be a valid number

#### Optional Fields
4. **Original Price**
   - Type: Number input
   - Example: 1299.99
   - Purpose: Shows discount percentage
   - Leave empty if no discount

5. **Rating**
   - Type: Number input (0-5)
   - Example: 4.8
   - Default: 0
   - Range: 0 to 5 stars

6. **Reviews Count**
   - Type: Number input
   - Example: 567
   - Default: 0
   - Purpose: Shows number of customer reviews

7. **Image URL**
   - Type: Text input
   - Example: "/iphone.png"
   - Default: "/placeholder.svg"
   - Purpose: Main product image

8. **Image 2 URL**
   - Type: Text input
   - Example: "/iphone-2.png"
   - Default: "/placeholder.svg"
   - Purpose: Secondary product image

9. **Badge**
   - Type: Text input
   - Examples: "Best Seller", "New", "Hot", "Popular"
   - Purpose: Display special label on product card

10. **In Stock**
    - Type: Checkbox
    - Default: Checked (true)
    - Purpose: Mark product availability

11. **Description**
    - Type: Text area
    - Example: "iPhone 15 Pro Max features..."
    - Purpose: Detailed product description

12. **Specifications**
    - Type: Text area (one per line)
    - Example:
      ```
      A17 Pro chip with 6-core GPU
      256GB Storage
      6.7-inch Super Retina XDR display
      ```
    - Purpose: List technical specifications

### Form Actions
- **Create Product**: Click "Create Product" button (new product)
- **Update Product**: Click "Update Product" button (editing)
- **Cancel**: Click "Cancel" button to close without saving

## Notifications

### Success Notification
```
✓ Product created successfully
✓ Product updated successfully
✓ Product deleted successfully
```
- **Color**: Green
- **Duration**: 3 seconds
- **Auto-dismiss**: Yes

### Error Notification
```
✗ Failed to save product
✗ Failed to delete product
✗ Failed to load products
```
- **Color**: Red
- **Duration**: 3 seconds
- **Auto-dismiss**: Yes

## Product Card

### Information Displayed
- Product image
- Product name
- Category badge
- Price (with original price if on sale)
- Rating (stars)
- Review count
- Stock status
- Special badge (if applicable)

### Actions (on hover)
- **Edit**: Modify product details
- **Delete**: Remove product from database

## Workflow Examples

### Example 1: Add a New Product

1. Click "+ Add Product" button
2. Fill in the form:
   - Name: "Sony WH-1000XM5 Wireless"
   - Category: "Headphones"
   - Price: "349"
   - Original Price: "399"
   - Rating: "4.7"
   - Reviews: "892"
   - Image: "/headphones.png"
   - Badge: "Popular"
   - Description: "Industry-leading noise cancellation..."
   - Specs: (enter each on new line)
     ```
     Industry-leading noise cancellation
     30-hour battery life
     Multipoint connection
     ```
   - In Stock: Checked
3. Click "Create Product"
4. See success notification
5. Product appears in dashboard

### Example 2: Edit a Product

1. Find product in dashboard
2. Hover over product card
3. Click edit icon (pencil)
4. Modal opens with current details
5. Update desired fields (e.g., price)
6. Click "Update Product"
7. See success notification
8. Product updates in dashboard

### Example 3: Delete a Product

1. Find product in dashboard
2. Hover over product card
3. Click delete icon (trash)
4. Confirm deletion in popup
5. See success notification
6. Product removed from dashboard

### Example 4: Search and Filter

1. Type "MacBook" in search bar
2. Results filter to show MacBooks
3. Click category filter dropdown
4. Select "Computers"
5. Results show only computers
6. Click sort dropdown
7. Select "Price: Low to High"
8. Products sort by price
9. Click "Clear Filters" to reset

## Tips & Tricks

### Productivity Tips
- Use search to quickly find products to edit
- Use filters to manage products by category
- Use sort to identify pricing issues
- Use grid view for quick visual scanning
- Use list view for detailed information

### Best Practices
- Always fill in required fields
- Use descriptive product names
- Add accurate pricing information
- Include relevant specifications
- Use appropriate badges (Best Seller, New, Hot)
- Keep descriptions concise but informative
- Use consistent image URLs

### Common Tasks

**Find all products under $500:**
1. Click sort dropdown
2. Select "Price: Low to High"
3. Scroll to find $500 threshold

**Update all prices in a category:**
1. Select category from filter
2. Edit each product individually
3. Update price field
4. Save changes

**Add new product category:**
1. Contact development team
2. Update category list in code
3. Redeploy application

## Keyboard Shortcuts

- `Esc` - Close modal/form
- `Enter` - Submit form (when focused on submit button)
- `Tab` - Navigate between form fields

## Troubleshooting

### Products Not Showing
- Check MongoDB connection
- Verify API is running
- Check browser console for errors
- Try refreshing page

### Form Not Submitting
- Ensure all required fields are filled
- Check for validation errors
- Verify MongoDB connection
- Check browser console for errors

### Notifications Not Appearing
- Check browser notifications settings
- Verify JavaScript is enabled
- Check browser console for errors

### Images Not Loading
- Verify image URLs are correct
- Check image file exists
- Verify image path is accessible
- Use absolute URLs if relative paths fail

## Performance Tips

- Use grid view for faster browsing
- Search to narrow down products
- Use filters to reduce displayed items
- Close modal when not in use
- Refresh page if experiencing slowness

## Data Backup

### Backup Your Data
```bash
# Export products to JSON
mongoexport --uri "mongodb://localhost:27017" \
  --db flair-tech \
  --collection products \
  --out products-backup.json
```

### Restore Data
```bash
# Import products from JSON
mongoimport --uri "mongodb://localhost:27017" \
  --db flair-tech \
  --collection products \
  --file products-backup.json
```

## Advanced Features

### Bulk Operations (Future)
- [ ] Bulk edit products
- [ ] Bulk delete products
- [ ] Bulk import from CSV
- [ ] Bulk export to CSV

### Analytics (Future)
- [ ] View product statistics
- [ ] Track sales by category
- [ ] Monitor inventory levels
- [ ] Generate reports

### Automation (Future)
- [ ] Auto-update prices
- [ ] Auto-sync inventory
- [ ] Auto-generate descriptions
- [ ] Auto-categorize products

## Support

For issues or questions:
1. Check QUICKSTART.md for setup help
2. Review API_DOCUMENTATION.md for API details
3. Check MONGODB_SETUP.md for database help
4. Review browser console for error messages
5. Check server logs for backend errors

## FAQ

**Q: Can I upload images directly?**
A: Currently, you need to provide image URLs. Image upload will be added in future versions.

**Q: Can I bulk import products?**
A: Currently, products must be added individually. Bulk import will be added in future versions.

**Q: Is there an undo function?**
A: No, but you can edit products to restore previous values. Implement version history in future.

**Q: Can multiple users edit simultaneously?**
A: Currently, there's no conflict resolution. Implement locking mechanism in future.

**Q: How do I backup my data?**
A: Use MongoDB export/import commands (see "Data Backup" section).

**Q: Can I delete all products at once?**
A: Currently, products must be deleted individually. Bulk delete will be added in future.

**Q: How do I change product categories?**
A: Contact development team to update category list in code.

**Q: Can I schedule product availability?**
A: Currently, no scheduling. This will be added in future versions.

## Conclusion

The Product Dashboard provides a comprehensive interface for managing your product inventory. With search, filtering, sorting, and CRUD operations, you can efficiently manage all aspects of your product catalog.

For more information, refer to the complete documentation in MONGODB_SETUP.md and API_DOCUMENTATION.md.

Happy managing! 🚀
