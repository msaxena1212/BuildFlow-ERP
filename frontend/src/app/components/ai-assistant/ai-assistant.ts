import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.html',
  styleUrls: ['./ai-assistant.css']
})
export class AiAssistant {
  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;
  isOpen = false;
  newMessage = '';

  messages: any[] = [
    { role: 'ai', text: 'Based on current logs, your labor efficiency has peaked in Block A. How can I assist you further?' }
  ];

  toggleAssistant() {
    this.isOpen = !this.isOpen;
  }

  sendMessage(text?: string) {
    const content = text || this.newMessage.trim();
    if (!content) return;
    
    this.messages.push({ role: 'user', text: content });
    this.newMessage = '';
    this.scrollToBottom();

    setTimeout(() => {
      this.messages.push({ role: 'ai', text: 'I am analyzing your request regarding "' + content + '". The updated insights will be reflected in your dashboard shortly.' });
      this.scrollToBottom();
    }, 1200);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }, 100);
  }
}
