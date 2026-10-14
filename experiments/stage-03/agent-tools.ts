import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredToolInterface } from "@langchain/core/tools";
import { AIMessageChunk, BaseMessage, tool } from "langchain";
import * as z from "zod";
import { checkMaxTokens } from "../../src/llm/checks.js";
import { model } from "../../src/llm/model.js";
import { errorHandler, logResponseContent } from "../helper.js";
try {
    // search Schema
    const searchSchema = z.object({
        orderId: z.string().describe("Order id to search"),
    });

    const customerIdSchema = z.object({
        customerId: z.string().describe("Customer unique id "),
    });

    // Output search schema
    const outPutSchema = z.object({
        status: z
            .enum(["found", "not found"])
            .describe("flag to determine if the data has been found "),
        data: z
            .object({
                orderId: z.number().describe("Order id of the data"),
                status: z.string().describe("status of the data"),
                item: z.string().describe("item of the data"),
            })
            .nullable()
            .describe(
                "data will be null if the status is not found, only the if  the search returns value we need this data object",
            ),
    });

    // search oder by id function
    const searchOrderById = (orderId: { orderId: string }) => {
        const orderDetails = fakeOrders.find((v) => v.id === orderId.orderId);
        return orderDetails ? orderDetails : "Not found";
    };

    const searchCustomerById = (customerId: { customerId: string }) => {
        const customerOrders = fakeOrders.filter(
            (v) => v.customerId === customerId.customerId,
        );
        return customerOrders ? customerOrders : "Not found";
    };
    // Get customer orders by customer id

    const fakeOrders = [
        {
            id: "1",
            customerId: "c1",
            status: "done",
            item: "abc",
            date: "2026-09-01",
        },
        {
            id: "2",
            customerId: "c1",
            status: "inprogress",
            item: "xyz",
            date: "2026-10-05",
        },
        {
            id: "3",
            customerId: "c2",
            status: "cancelled",
            item: "pqr",
            date: "2026-08-20",
        },
    ];

    // Tools
    const get_order_details_by_id = tool(searchOrderById, {
        name: "get_order_details_by_id",
        schema: searchSchema,
        description:
            "Tool to identify the order details that matches to the order id",
    });

    const get_all_customer_orders_by_id = tool(searchCustomerById, {
        name: "get_all_customer_orders_by_id",
        schema: customerIdSchema,
        description: "Tool to get all customer orders based on customer id",
    });
    const chatPrompt = ChatPromptTemplate.fromMessages([
        {
            role: "system",
            content:
                "You are a oder support. You have to support the user to find the order details and give appropriate response",
        },
        { role: "human", content: "{question}" },
    ]);

    // convert to [] so that future response can be .pushed();
    const messages: BaseMessage[] = (
        await chatPrompt.invoke({
            question: "my customer id is c1, what is my latest order info?",
        })
    ).toChatMessages();

    // binding tool and model
    const bindTool = model.bindTools([
        get_all_customer_orders_by_id,
        get_order_details_by_id,
    ]);

    const response = await bindTool.invoke(messages);

    // check max tokens;
    checkMaxTokens(response);

    messages.push(response);

    const checkForToolCallRecursive = async (aiResponse: AIMessageChunk) => {
        checkMaxTokens(response);
  
        if (aiResponse.response_metadata.stop_reason === "tool_use") {
            // looping tool calls and calling tools
            const tools: StructuredToolInterface[] = [
                get_all_customer_orders_by_id,
                get_order_details_by_id,
            ];

            for (const toolCall of aiResponse.tool_calls ?? []) {
                const selected = tools.find((t) => t.name === toolCall.name);
                if (!selected) continue;
                const result = await selected.invoke(toolCall);
                messages.push(result);
            }

            const newResponse: AIMessageChunk = await bindTool.invoke(messages);
            if (aiResponse.response_metadata.stop_reason === "tool_use")
                checkForToolCallRecursive(newResponse);
            else
                logResponseContent(newResponse)
        } else {
            logResponseContent(aiResponse)
        }
    };

    checkForToolCallRecursive(response);
} catch (err) {
    errorHandler(err)
}