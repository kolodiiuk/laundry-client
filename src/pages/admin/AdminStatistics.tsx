import CustomersOrderedTheMostStats from "../stats/CustomersOrderedTheMostStats";
import OrdersLastMonthStats from "../stats/OrdersLastMonthStats";
import OrdersLastYearStats from "../stats/OrdersLastYearStats";
import ServicesOrderedTheMostStats from "../stats/ServicesOrderedTheMostStats";

export default function AdminStats() {
        return (
          <div>
            <h1>Статистики</h1>
            <h2>Топ 10 послуг, які замовляють найчастіше </h2>
            <ServicesOrderedTheMostStats />
            <h2>Топ 10 клієнтів, які замовляють найчастіше</h2>
            <CustomersOrderedTheMostStats />
            <h2>Замовлення за останній місяць</h2>
            <OrdersLastMonthStats />
            <h2>Замовлення за останній рік</h2>
            <OrdersLastYearStats />
          </div>
        );
}