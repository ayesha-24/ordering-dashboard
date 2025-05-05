import { Injectable, NotFoundException } from '@nestjs/common';
import data from '../../data.json';

type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSize;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface NextDeliveryDto {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

@Injectable()
export class CommsService {
  private readonly data: Customer[] = data as Customer[];

  private listNames(names: string[]): string {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  }

  private nextDeliveryDto(c: Customer): NextDeliveryDto {
    const activeCats = c.cats.filter((cat) => cat.subscriptionActive);

    const catNames = activeCats.map((cat) => cat.name);
    const catList = this.listNames(catNames);

    const priceTable: Record<PouchSize, number> = {
      A: 55.5,
      B: 59.5,
      C: 62.75,
      D: 66,
      E: 69,
      F: 71.25,
    };

    const total = activeCats.reduce(
      (sum, cat) => sum + priceTable[cat.pouchSize],
      0,
    );

    return {
      title: `Your next delivery for ${catList}`,
      message: `Hey ${c.firstName}! In two days' time, we'll be charging you for your next order for ${catList}'s fresh food.`,
      totalPrice: Number(total.toFixed(2)),
      freeGift: total > 120,
    };
  }

  getNextDelivery(): Customer[] {
    return this.data;
  }

  getById(id: string): NextDeliveryDto {
    const customer = this.data.find((c) => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return this.nextDeliveryDto(customer);
  }
}
