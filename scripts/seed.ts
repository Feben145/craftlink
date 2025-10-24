const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a test seller
  const seller = await prisma.user.create({
    data: {
      name: "Elena Handmade Crafts",
      email: "elena@craftlink.com",
      phone: "0911223344",
      location: "Addis Ababa",
      category: "handmade",
      role: "SELLER",
    },
  });

  // Create some products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: "Traditional Ethiopian Basket",
        description: "Handwoven basket with beautiful patterns",
        price: 350.0,
        category: "handmade",
        sellerId: seller.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Handmade Leather Bag",
        description: "Genuine leather bag with traditional embroidery",
        price: 850.0,
        category: "handmade",
        sellerId: seller.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Silver Ethiopian Cross",
        description: "Beautiful silver cross pendant",
        price: 450.0,
        category: "handmade",
        sellerId: seller.id,
      },
    }),
  ]);

  // Create some orders
  await prisma.order.create({
    data: {
      buyerName: "Sarah Johnson",
      buyerEmail: "sarah@example.com",
      buyerPhone: "0944455667",
      quantity: 1,
      totalPrice: 350.0,
      productId: products[0].id,
      sellerId: seller.id,
      status: "CONFIRMED",
    },
  });

  await prisma.order.create({
    data: {
      buyerName: "Michael Brown",
      buyerEmail: "michael@example.com",
      buyerPhone: "0977788990",
      quantity: 2,
      totalPrice: 1700.0,
      productId: products[1].id,
      sellerId: seller.id,
      status: "PENDING",
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`📧 Seller: ${seller.email}`);
  console.log(`🛍️ Products: ${products.length}`);
  console.log(`📦 Orders: 2`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
