
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublishableKey);
  }

  async createCheckoutSession(amount: number, currency: string, bookingId: number): Promise<string> {
    try {
      const response = await this.http
        .post<{ sessionId: string }>('http://localhost:8888/api/payments/create-checkout-session', {
          amount,
          currency,
          bookingId,
        })
        .toPromise();
  
      console.log('Payment Session Response:', response);
      return response!.sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize.');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId, 
    });

    if (error) {
      console.error('Error redirecting to Stripe Checkout:', error);
      throw error;
    }
  }
}