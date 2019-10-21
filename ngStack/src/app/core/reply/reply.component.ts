import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply.model';
import { RepliesStoreFacade } from 'src/app/store/replies/replies.store-facade';

@Component({
    selector: 'reply',
    templateUrl: './reply.component.html',
    styles: ['']
})
export class ReplyComponent {
    reply: Observable<Reply[]>;
    constructor(private repliesStoreFacade: RepliesStoreFacade) {

        this.reply = repliesStoreFacade.all();
    }
}
