export interface SecurityUpdate {
	advertId: string;
	email: string;
}

export interface SecurityRequest {
	code: string;
	hash: string;
}

export interface SecurityAction {
	action: 'create' | 'update' | 'delete';
}