import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { ErrorCatchingInterceptor } from './error-catching.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export const InterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
];
