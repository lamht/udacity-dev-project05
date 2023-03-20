import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";
import { HttpHeaders, HttpRequest } from "@angular/common/http";
import { FeedItem } from "../feed/models/feed-item.model";
 
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
 
export interface Params {
	[ key: string ]: any;
}
 
export interface GetOptions {
	endPoint: string;
	params?: Params;
}
 
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

const API_HOST = environment.apiHost;
 
@Injectable({
	providedIn: "root"
})
export class ApiAxiosClient {
 
	private axiosClient: AxiosInstance;
	private errorHandler: ErrorHandler;
 
	// I initialize the ApiClient.
	constructor( errorHandler: ErrorHandler,
		private auth: AuthService ) {
 
		this.errorHandler = errorHandler;
 
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				"Content-Type": "application/json"
			}
		});

		auth.idTokenClaims$.subscribe(token =>{
			if(token){
			  this.setAuthToken(token.__raw);
			}
		  });
 
	}

	setAuthToken(token: any) {
		if(token){
		  this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			}
		});
		}
	  }
	
 
	// ---
	// PUBLIC METHODS.
	// ---
 
	// I perform a GET request with the given options.
	public async get<T>( options: GetOptions ) : Promise<T> {
 
		try {
			const url = `${API_HOST}${options.endPoint}`;
			var axiosResponse = await this.axiosClient.request<T>({
				method: "get",
				url: url,
				params: options.params
			});
 
			return( axiosResponse.data );
 
		} catch ( error ) {
 
			return( Promise.reject( this.normalizeError( error ) ) );
 
		}
 
	}

	public async post<T>( options: GetOptions, payload: any ) : Promise<T> {
 
		try {
			const url = `${API_HOST}${options.endPoint}`;
			var axiosResponse = await this.axiosClient.request<T>({
				method: "post",
				url: url,
				params: options.params,
				data: payload
			});
 
			return( axiosResponse.data );
 
		} catch ( error ) {
 
			return( Promise.reject( this.normalizeError( error ) ) );
 
		}
 
	}

	public async upload(endpoint: string, file: File, payload: any): Promise<FeedItem> {
		const url = `${endpoint}/signed-url/${file.name}`;
		const signed_url = (await this.post<any>({endPoint: `${endpoint}/signed-url/${file.name}`},{})).url;

		let formData = new FormData();
		formData.append("image", file);
		let resp = await axios.put(signed_url, formData, {
			headers: {
			'Content-Type': 'multipart/form-data'
			}
		});
		payload.url = signed_url.split("?")[0];
		let axiosResponse = await this.post<FeedItem>({endPoint: endpoint}, payload);
		return axiosResponse;
	
	  }
 
	// ---
	// PRIVATE METHODS.
	// ---
 
	// Errors can occur for a variety of reasons. I normalize the error response so that
	// the calling context can assume a standard error structure.
	private normalizeError( error: any ) : ErrorResponse {
 
		this.errorHandler.handleError( error );
 
		// NOTE: Since I'm not really dealing with a production API, this doesn't really
		// normalize anything (ie, this is not the focus of this demo).
		return({
			id: "-1",
			code: "UnknownError",
			message: "An unexpected error occurred."
		});
 
	}
 
}