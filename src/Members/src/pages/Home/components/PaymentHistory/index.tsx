import moment from "moment";
import {
  PaymentHistoryCard,
  PaymentHeader,
  Label,
  PaymentTable,
  TableHeader,
  TableRow,
  TableCell,
} from "./PaymentHistory.styled";

interface Props {
  payments: any[];
}

const PaymentHistory = ({ payments }: Props) => {
  return (
    <PaymentHistoryCard>
      <PaymentHeader>
        <Label>To'lovlar Tarixi</Label>
      </PaymentHeader>
      <PaymentTable>
        <thead>
          <TableHeader>
            <th>Sana</th>
            <th>Summa</th>
            <th>Usul</th>
          </TableHeader>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p: any, i: number) => (
              <TableRow key={i}>
                <TableCell>
                  {moment(p.paidAt).format("lll")
                    ? moment(p.paidAt).format("lll")
                    : new Date(p.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{p.amount} UZS</TableCell>
                <TableCell>{p.method}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                style={{ textAlign: "center", color: "#777" }}
              >
                To'lovlar mavjud emas
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </PaymentTable>
    </PaymentHistoryCard>
  );
};

export default PaymentHistory;
