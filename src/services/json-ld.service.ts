// json-ld.service.ts
import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {
  private doc = inject<Document>(DOCUMENT);

  private scriptElement: HTMLScriptElement | null = null;

  /**
   * Устанавливает любую схему JSON-LD.
   * @param schema - Объект схемы (например, Article, FAQPage).
   */
  setSchema(schema: object): void {
    this.removeSchema(); // Сначала удаляем старую схему

    try {
      this.scriptElement = this.doc.createElement('script');
      this.scriptElement.type = 'application/ld+json';
      this.scriptElement.textContent = JSON.stringify(schema);
      this.doc.head.appendChild(this.scriptElement);
    } catch (e) {
      console.error('Ошибка при создании JSON-LD схемы', e);
    }
  }

  /**
   * Удаляет скрипт JSON-LD из <head>.
   */
  removeSchema(): void {
    if (this.scriptElement && this.doc.head.contains(this.scriptElement)) {
      this.doc.head.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
  }
}
