import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetModule } from './like-widget.module';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    // essa forma de uso do TestBed é mais segura de ser usada, pois independente do assembler\
    //no caso do Angular, atualmente WebPack, gera o componente inline
    beforeEach(async () => {
        // usando async/await para chamar o método assíncrono compileComponents
        await
            // cria o módulo para o teste
            TestBed
            // configura o modulo a cada teste
            .configureTestingModule({
                // essa é outra abordagem de teste, que simplifica o teste depois do componente ter sido desenvolvido
                imports: [LikeWidgetModule]                        // declara as dependências deste módulo de teste
            }).compileComponents();

        // cria o objeto que embrulha o component. Este objeto é conhecido como Fixture
        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    // verifica se o TestBed conseguiu criar o componente corretamente
    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        // no ambiente de teste, o desenvolvedor é que é responsável por disparar a detecção de alterações no componente
        fixture.detectChanges();

        expect(component.id).toBeTruthy();
    });

    it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
        const someId = 'app-someId';
        component.id = someId;
        // somente chama o detectChanges depois de configurar o input property
        fixture.detectChanges();

        expect(component.id).toBe(someId);
    });

    // teste de output property com a função spyOn
    it(`#${LikeWidgetComponent.prototype.like.name}
     should trigger (@Output liked) when called`, () => {
        // recebe o objeto que contém o método a ser espionado, o segundo parâmetro é o nome do método
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();

        expect(component.liked.emit).toHaveBeenCalled();
    });
});
