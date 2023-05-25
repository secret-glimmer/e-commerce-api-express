import { Document, Model, PaginateModel } from 'mongoose';

// TS
import { IAddress, IUser, IProduct, TDocument } from '@ts';

export interface IOrder extends TDocument {
	user: TDocument['_id'];
	deliveryAddress: IAddress;
	totalPrice: number;
	status: 'pending' | 'canceled' | 'delivered' | 'completed';
	observation?: string;
	products: {
		product: TDocument['_id'];
		quantity: number;
	}[];
}

export interface IOrderPopulated extends Omit<IOrder, 'user' | 'products'> {
	user: IUser;
	products: {
		product: IProduct;
		quantity: number;
	}[];
}

export interface IOrderDocument extends IOrder, Document<string> {}
export interface IOrderModel extends Model<IOrderDocument> {}
export interface IOrderMethods extends IOrderDocument {}
export interface IOrderPaginateModel
	extends PaginateModel<IOrderDocument, {}, IOrderMethods> {}
