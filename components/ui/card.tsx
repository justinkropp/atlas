// Added 1px border to all cards
export const Card = ({ children, className }) => (
  <div className={`bg-white border border-gray-200 overflow-hidden ${className}`}>{children}</div>
)

export const CardContent = ({ children, className }) => <div className={`p-4 ${className}`}>{children}</div>

export const CardDescription = ({ children, className }) => <p className={`text-gray-600 ${className}`}>{children}</p>

export const CardHeader = ({ children, className }) => <div className={`p-4 border-b ${className}`}>{children}</div>

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-gray-900 font-bold ${className}`}>{children}</h2>
)
