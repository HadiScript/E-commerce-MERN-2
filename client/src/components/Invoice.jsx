import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>
                ~ {new Date().toLocaleString()} ~
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.author}>React Redux Ecommerce</Text>
            <Text style={styles.subtitle}>Order Summary</Text>

            <Table>
                <TableHeader>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                </TableHeader >
            </Table >

            <Table data={order.orderItems}>
                <TableBody>
                    <DataTableCell getContent={(x) => x.name} />
                    <DataTableCell getContent={(x) => `PKR  ${x.price}`} />
                    <DataTableCell getContent={(x) => x.qty} />

                </TableBody>
            </Table>
            <Text style={styles.text}>
                <Text>
                    Date: {"               "}
                    {new Date(order.createdAt * 1000).toLocaleString()}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Order Id: {"         "}
                    {order._id}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Total Items: {"         "}
                    {order.totalItems}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Order Status: {"  "}
                    {order.isDelivered ? "delivered" : "not delivered yet"}
                </Text>
                {"\n"}
                {"\n"}

                <Text>
                    Payment method: {"       "}
                    {order.paymentMethod}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Tax Price: PKR  {order.taxPrice}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Total Price: PKR {order.taxPrice} +
                    PKR {order.totalPrice}
                </Text>
                {"\n"}
                {"\n"}
                {"\n"}
                <Text>
                    Address: {"       "}
                    {order.shippingAddress.address}
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                    Phone Number: {"  "}
                    {order.shippingAddress.phoneNumber}
                </Text>
                {"\n"}
                {"\n"}
            </Text>

            <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>

        </Page>
    </Document>
);

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export default Invoice;

{/* <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>
                ~ {new Date().toLocaleString()} ~
            </Text>
            <Text style={styles.title}>Devs</Text>
            <Text style={styles.author}>Order Invoice</Text>
            <Text style={styles.subtitle}>Order Summary</Text>

            <Table>
                <TableHeader>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                     <TableCell>Producd Id</TableCell> 
                    </TableHeader >
                    </Table >
        
            <Table data={order.orderItems}>
                <TableBody>
                    <DataTableCell getContent={(x) => x.name} />
                    <DataTableCell getContent={(x) => `PKR  ${x.price}`} />
                    <DataTableCell getContent={(x) => x.qty} />
                </TableBody>
            </Table>
        { "\n" } { "\n" } { "\n" } { "\n" }
                    <Text style={styles.text}>
                        <Text>
                            Date: {"               "}
                            {new Date(order.createdAt * 1000).toLocaleString()}
                        </Text>
                        {"\n"}
                        {"\n"}
                        <Text>
                            Order Id: {"         "}
                            {order._id}
                        </Text>
                        {"\n"}
                        {"\n"}
                        <Text>
                            Total Items: {"         "}
                            {order.totalItems}
                        </Text>
                        {"\n"}
                        {"\n"}
                        <Text>
                            Order Status: {"  "}
                            {order.isDelivered ? "delivered" : "not delivered yet"}
                        </Text>
                        {"\n"}
                        {"\n"}
        
                        <Text>
                            Payment method: {"       "}
                            {order.paymentMethod}
                        </Text>
                        {"\n"}
                        {"\n"}
                        <Text>
                            Total Price: {"       "}
                            PKR {order.totalPrice}
                        </Text>
                        {"\n"}
                        {"\n"}
                        {"\n"}
                        <Text>
                            Address: {"       "}
                            {order.shippingAddress.address}
                        </Text>
                    </Text>
        
                    <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
                </Page >
            </Document > 
            }
            */
}