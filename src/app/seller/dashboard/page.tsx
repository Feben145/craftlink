import { prisma } from "@/lib/prisma";

export default async function SellerDashboard() {
  // For now, we'll use a test seller - later we'll add authentication
  const testSeller = await prisma.user.findFirst({
    where: { role: "SELLER" },
    include: {
      products: true,
      orders: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!testSeller) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-4">
            No seller data found. Please register as a seller first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {testSeller.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {testSeller.products.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {testSeller.orders.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ETB{" "}
              {testSeller.orders
                .reduce((sum, order) => sum + order.totalPrice, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>
          <div className="p-6">
            {testSeller.orders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {testSeller.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b pb-4 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.buyerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.product.title} × {order.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ETB {order.totalPrice.toFixed(2)}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "CONFIRMED"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "SHIPPED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Products
            </h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Add Product
            </button>
          </div>
          <div className="p-6">
            {testSeller.products.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No products listed yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testSeller.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>
                    <p className="text-purple-600 font-bold mt-2">
                      ETB {product.price.toFixed(2)}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        {product.category}
                      </span>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
