import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMainComponent } from '../../components/cards/card-main/card-main';
import { Modal } from '../../components/modal/modal';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { TrelloBackendService } from '../../services/trello.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CardData } from './card-data.interface';

@Component({
  selector: 'app-dashbord-page',
  standalone: true,
  imports: [
    CommonModule,
    CardMainComponent,
    Modal,
    SidebarComponent
],
  templateUrl: './dashbord-page.html',
  styleUrls: ['./dashbord-page.scss']
})
export class DashbordPage implements OnInit {

cards: CardData[] = [
  { id: 'higiene_limpeza', title: 'Higiene & Limpeza', icon: 'fa-solid fa-hand-sparkles', status: 'not-started' },
  { id: 'alimentos_cardapio', title: 'alimentos_cardapio', icon: 'fa-solid fa-book-open', status: 'not-started' },
  { id: 'operacao_atendimento', title: 'operacao_atendimento', icon: 'fa-solid fa-bell-concierge', status: 'not-started' },
  { id: 'estrutura_equipamentos', title: 'estrutura_equipamentos', icon: 'fa-solid fa-utensils', status: 'not-started' },
  { id: 'verificacao', title: 'Verificacao', icon: 'fa-solid fa-file-circle-check', status: 'not-started' },
];

  syncing = false;
  boardId: string | null = null;
  listId: string | null = null;
  loadingChecklist = false;
  uploading = false;
  checklistOptions: { name: string; checked?: boolean }[] = [];
  currentCardId: string | null = null;
  currentTrelloCardId: string | null = null;
  trelloCardMap: Record<string, string> = {};
  attachmentsMap: Record<string, { url: string; name: string }[]> = {};
  currentAttachments: { url: string; name: string }[] = [];
  checklistsByCard: Record<string, string[]> = {
    higiene_limpeza: [
      'Gerenciar residuos: lixeiras tampadas e limpas conforme normas sanitarias.',
      'Check de limpeza: salao, banheiros, cozinha e utensilios registrados.',
      'Asseio pessoal: equipe seguindo boas praticas de higiene dos manipuladores.'
    ],
    alimentos_cardapio: [
      'Conferir cardapio servido vs divulgado oficialmente.',
      'Verificar reaproveitamento de sobras (pratica proibida).',
      'Coletar e armazenar amostras de todos os componentes da refeicao.',
      'Registrar qualidade sensorial e temperatura dos alimentos no buffet.',
      'Inspecionar estoques de materias-primas: organizacao, protecao, validade.'
    ],
    operacao_atendimento: [
      'Avaliar funcionamento do buffet e cumprimento de horarios de atendimento.',
      'Verificar uniformes e EPIs da equipe conforme normas de seguranca e higiene.',
      'Registrar reclamacoes recebidas dos usuarios durante a vistoria.'
    ],
    estrutura_equipamentos: [
      'Inspecionar condicoes dos equipamentos da cozinha e reportar defeitos.',
      'Conferir armazenamento separado/correto de produtos de limpeza e alimentos.'
    ],
    verificacao: [
      'Verificacao documental mensal: validade de alvaras e licencas.',
      'Registrar validade do comprovante de controle de pragas.',
      'Verificar relatorios de manutencao e ASOs da equipe.'
    ]
  };

  constructor(
    private trello: TrelloBackendService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.trello.getMyBoards().subscribe({
      next: (boards) => console.log('Boards Trello:', boards),
      error: (err) => console.error('Erro Trello:', err)
    });
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || window.history.state;
    const openTitle = state?.['openModalTitle'];
    if (openTitle) {
      this.openModalFromSidebar(openTitle);
    }
  }

  syncCardsWithTrello() {
    this.syncing = true;
    this.trello.syncCardsWithChecklists(this.cards, this.checklistsByCard, {
      boardId: this.boardId,
      listId: this.listId,
      boardName: 'UTF-Check',
      listName: 'UTF-Check Checklist'
    }).subscribe({
      next: (result) => {
        console.log('Cards criados no Trello:', result);
        this.listId = result.listId; // guardar para leituras posteriores
        if (Array.isArray(result.createdCards)) {
          result.createdCards.forEach((c: any, idx: number) => {
            const source = this.cards[idx];
            if (source && c?.id) {
              this.trelloCardMap[source.id] = c.id;
            }
          });
        }
        this.toastr.success('Sincronizacao com Trello concluida.', 'Sucesso');
        this.syncing = false;
      },
      error: (err) => {
        console.error('Erro ao sincronizar Trello:', err);
        this.toastr.error('Erro ao sincronizar com Trello.', 'Erro');
        this.syncing = false;
      }
    });
  }

  openModal(card: CardData) {
    this.currentCardId = card.id;
    this.currentAttachments = this.attachmentsMap[card.id] ?? [];
    this.modalTitle = card.title;
    this.showModal = true;
    this.loadChecklistFromTrello(card);
  }

  private loadChecklistFromTrello(card: CardData) {
    if (!this.listId) {
      this.checklistOptions = (this.checklistsByCard[card.id] ?? []).map((name) => ({ name, checked: false }));
      this.currentTrelloCardId = null;
      this.currentAttachments = this.attachmentsMap[card.id] ?? [];
      return;
    }

    this.loadingChecklist = true;
    this.trello.getCardsWithChecklists(this.listId).subscribe({
      next: (cards: any[]) => {
        const match = cards.find((c) => c.name === card.title);
        this.currentTrelloCardId = match ? match.id : null;
        if (match?.id) {
          this.trelloCardMap[card.id] = match.id;
        }
        const items = match
          ? match.checklists.flatMap((cl: any) => (cl.items || []).map((i: any) => ({
              name: i.name,
              checked: i.state === 'complete'
            })))
          : [];
        this.checklistOptions = items;
        this.updateCardStatusFromItems(card.id, items);
        if (match?.id) {
          this.loadAttachmentsForCard(card.id, match.id);
        } else {
          this.currentAttachments = this.attachmentsMap[card.id] ?? [];
        }
        this.loadingChecklist = false;
      },
      error: (err) => {
        console.error('Erro ao carregar checklist do Trello:', err);
        this.checklistOptions = (this.checklistsByCard[card.id] ?? []).map((name) => ({ name, checked: false }));
        this.currentAttachments = this.attachmentsMap[card.id] ?? [];
        this.loadingChecklist = false;
      }
    });
  }

  onProgressChange(event: { percentage: number; selected: number; total: number }) {
    if (!this.currentCardId) {
      return;
    }
    this.updateCardStatus(this.currentCardId, event.selected, event.total);
  }

  onFileSelected(file: File) {
    const targetCardId = this.currentTrelloCardId || (this.currentCardId ? this.trelloCardMap[this.currentCardId] : null);
    if (!targetCardId) {
      console.warn('Nenhum card Trello associado para upload.');
      return;
    }
    this.uploading = true;
    this.trello.uploadAttachment(targetCardId, file).subscribe({
      next: (res) => {
        console.log('Upload realizado no Trello:', res);
        const url = (res as any)?.url;
        const name = (res as any)?.name ?? file.name;
        if (url && this.currentCardId) {
          const updated = [...(this.attachmentsMap[this.currentCardId] ?? []), { url, name }];
          this.attachmentsMap[this.currentCardId] = updated;
          this.currentAttachments = updated;
        }
        this.uploading = false;
      },
      error: (err) => {
        console.error('Erro ao enviar imagem para Trello:', err);
        this.uploading = false;
      }
    });
  }

  private updateCardStatusFromItems(cardId: string, items: { name: string; checked?: boolean }[]) {
    const total = items.length;
    const selected = items.filter((i) => i.checked).length;
    this.updateCardStatus(cardId, selected, total);
  }

  private loadAttachmentsForCard(localCardId: string, trelloCardId: string) {
    this.trello.getAttachments(trelloCardId).subscribe({
      next: (atts: any[]) => {
        const mapped = (atts || []).map((a) => ({ url: a.url, name: a.name }));
        this.attachmentsMap[localCardId] = mapped;
        this.currentAttachments = mapped;
      },
      error: (err) => {
        console.error('Erro ao buscar anexos no Trello:', err);
        this.currentAttachments = this.attachmentsMap[localCardId] ?? [];
      }
    });
  }

  private updateCardStatus(cardId: string, selected: number, total: number) {
    const previous = this.cards.find((c) => c.id === cardId)?.status;
    const status: CardData['status'] =
      total === 0 || selected === 0 ? 'not-started' :
      selected === total ? 'done' : 'partial';

    this.cards = this.cards.map((c) => c.id === cardId ? { ...c, status } : c);
    if (status === 'done' && previous !== 'done') {
      const title = this.cards.find((c) => c.id === cardId)?.title || 'Checklist';
      this.toastr.success(`${title} concluido.`, 'Checklist completo');
    }
  }

  showModal = false;
  modalTitle: string | undefined;
  openModalFromSidebar(title: string) {
    const aliasMap: Record<string, string> = {
      'Alimentos e Cardapio': 'alimentos_cardapio',
      'Operacao & Atendimento': 'operacao_atendimento',
      'Estrutura & Equipamentos': 'estrutura_equipamentos',
      'Verificacao': 'verificacao',
      'Higiene & Limpeza': 'higiene_limpeza'
    };
    const targetId = aliasMap[title] || title;
    const found = this.cards.find((c) => c.title === title || c.id === targetId || c.title.toLowerCase() === title.toLowerCase());
    if (found) {
      this.openModal(found);
    } else {
      this.currentCardId = null;
      this.modalTitle = title;
      this.checklistOptions = [];
      this.currentAttachments = [];
      this.showModal = true;
    }
  }
  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.authService.logout();
  }
}
